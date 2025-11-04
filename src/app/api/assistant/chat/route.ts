import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json();

    if (!message || !userId) {
      return NextResponse.json({ error: 'Message and userId are required' }, { status: 400 });
    }

    // Initialize ZAI
    const zai = await ZAI.create();

    // Get user context for personalized responses
    const userProfile = await db.userProfile.findUnique({
      where: { userId }
    });

    const recentTransactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 10
    });

    const activeTasks = await db.task.findMany({
      where: { 
        userId,
        status: { in: ['pending', 'in_progress'] }
      },
      orderBy: { dueDate: 'asc' },
      take: 5
    });

    // Build context for AI
    const context = {
      userProfile: userProfile ? {
        work: userProfile.work,
        hobbies: userProfile.hobbies,
        goals: userProfile.goals
      } : null,
      recentSpending: recentTransactions
        .filter(t => t.amount < 0)
        .slice(0, 5)
        .map(t => ({ description: t.description, amount: t.amount, category: t.category })),
      upcomingTasks: activeTasks.map(t => ({ title: t.title, dueDate: t.dueDate, priority: t.priority }))
    };

    // Determine message type and create appropriate prompt
    const messageType = determineMessageType(message);
    const systemPrompt = createSystemPrompt(messageType, context);

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Store conversation in AI memory for future context
    await db.aiMemory.create({
      data: {
        userId,
        context: `Q: ${message}\nA: ${aiResponse}`,
        category: messageType,
        importance: 5
      }
    });

    return NextResponse.json({
      success: true,
      response: aiResponse,
      type: messageType
    });

  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}

function determineMessageType(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('spend') || lowerMessage.includes('expense') || lowerMessage.includes('budget')) {
    return 'financial';
  } else if (lowerMessage.includes('task') || lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
    return 'productivity';
  } else if (lowerMessage.includes('invest') || lowerMessage.includes('save') || lowerMessage.includes('money')) {
    return 'advice';
  } else if (lowerMessage.includes('analyze') || lowerMessage.includes('pattern') || lowerMessage.includes('insight')) {
    return 'insight';
  }
  
  return 'general';
}

function createSystemPrompt(type: string, context: any): string {
  const basePrompt = `You are a helpful AI personal assistant for a personal dashboard application. You help users with financial management, task scheduling, and productivity. Be friendly, professional, and provide actionable advice.

User Context:
- Work: ${context.userProfile?.work || 'Not specified'}
- Hobbies: ${context.userProfile?.hobbies || 'Not specified'}
- Goals: ${context.userProfile?.goals || 'Not specified'}
- Recent spending: ${context.recentSpending.map((t: any) => `${t.description} (${t.category})`).join(', ') || 'No recent transactions'}
- Upcoming tasks: ${context.upcomingTasks.map((t: any) => `${t.title} (${t.priority})`).join(', ') || 'No active tasks'}

Currency is IDR (Indonesian Rupiah).`;

  const typeSpecificPrompts = {
    financial: `${basePrompt}
    
Focus on providing financial insights, budget analysis, and spending recommendations. Use the user's transaction data to provide personalized advice.`,
    
    productivity: `${basePrompt}
    
Focus on task management, scheduling advice, and productivity tips. Help the user organize their tasks and time effectively.`,
    
    advice: `${basePrompt}
    
Focus on providing financial advice, investment tips, and money-saving strategies. Consider the user's goals and current financial situation.`,
    
    insight: `${basePrompt}
    
Focus on analyzing patterns, providing insights, and identifying trends in the user's data. Be analytical and data-driven.`,
    
    general: `${basePrompt}
    
Provide helpful, personalized assistance across all areas of the user's personal dashboard.`
  };

  return typeSpecificPrompts[type as keyof typeof typeSpecificPrompts] || typeSpecificPrompts.general;
}