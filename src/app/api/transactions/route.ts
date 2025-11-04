import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { description, userId } = await request.json();

    if (!description || !userId) {
      return NextResponse.json({ error: 'Description and userId are required' }, { status: 400 });
    }

    // Initialize ZAI for categorization
    const zai = await ZAI.create();

    // AI Categorization Prompt
    const categorizationPrompt = `
    Analyze this transaction description and extract information: "${description}"
    
    Available categories: Food, Transport, Shopping, Bills, Entertainment, Health, Income, Other
    
    Return JSON with:
    - category: string (one of the available categories)
    - amount: number (extract the amount, positive for income, negative for expenses)
    - confidence: number (0-1)
    - tags: array of relevant tags
    - cleanedDescription: string (clean, readable description)
    
    Examples:
    "bought coffee 25k" -> {"category": "Food", "amount": -25000, "confidence": 0.95, "tags": ["coffee", "beverage"], "cleanedDescription": "Coffee purchase"}
    "salary 8.5 million" -> {"category": "Income", "amount": 8500000, "confidence": 0.98, "tags": ["salary", "monthly"], "cleanedDescription": "Monthly salary"}
    `;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a financial transaction analyzer. Always return valid JSON.'
        },
        {
          role: 'user',
          content: categorizationPrompt
        }
      ],
      temperature: 0.1,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    let aiData;
    try {
      aiData = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      // Fallback to default categorization
      aiData = {
        category: 'Other',
        amount: 0,
        confidence: 0.1,
        tags: [],
        cleanedDescription: description
      };
    }

    // Create transaction in database
    const transaction = await db.transaction.create({
      data: {
        userId,
        description: aiData.cleanedDescription || description,
        amount: aiData.amount || 0,
        category: aiData.category || 'Other',
        tags: aiData.tags ? aiData.tags.join(',') : '',
        date: new Date(),
        currency: 'IDR'
      }
    });

    // Check budget alerts
    await checkBudgetAlerts(userId, aiData.category, Math.abs(aiData.amount));

    return NextResponse.json({
      success: true,
      transaction,
      aiAnalysis: aiData
    });

  } catch (error) {
    console.error('Transaction creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const where: any = { userId };
    if (category && category !== 'all') {
      where.category = category;
    }

    const transactions = await db.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit
    });

    return NextResponse.json({ transactions });

  } catch (error) {
    console.error('Transaction fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

async function checkBudgetAlerts(userId: string, category: string, amount: number) {
  try {
    // Get current month budget for this category
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const budget = await db.budget.findFirst({
      where: {
        userId,
        category,
        period: 'monthly',
        startDate: { lte: startOfMonth },
        OR: [
          { endDate: null },
          { endDate: { gte: endOfMonth } }
        ]
      }
    });

    if (!budget) return;

    // Calculate current spending for this category
    const currentSpending = await db.transaction.aggregate({
      where: {
        userId,
        category,
        amount: { lt: 0 }, // expenses only
        date: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      },
      _sum: { amount: true }
    });

    const totalSpent = Math.abs(currentSpending._sum.amount || 0);
    const budgetPercentage = (totalSpent / budget.amount) * 100;

    // Create notification if over threshold
    if (budgetPercentage >= 80) {
      await db.notification.create({
        data: {
          userId,
          title: 'Budget Alert',
          message: `You've used ${budgetPercentage.toFixed(1)}% of your ${category} budget`,
          type: 'budget',
          read: false
        }
      });
    }

  } catch (error) {
    console.error('Budget check error:', error);
  }
}