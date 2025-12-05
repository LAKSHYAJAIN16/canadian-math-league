import { NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, Firestore } from 'firebase/firestore';
import { db as firestoreDb } from '@/lib/config';

// Assert that db is not undefined
const db = firestoreDb as Firestore;

// Answer key (question ID to correct answer)
const ANSWER_KEY: Record<number, string> = {
    1: '133',  // Example answer
    2: '30',   // Example answer
    3: '1024', // 2^10
    4: '154',  // 22/7 * 7 * 7
    5: '36',   // LCM of 12 and 18
    6: '7',    // 3x - 7 = 14 => x = 7
    7: '720',  // Sum of interior angles of hexagon
    8: '30',   // 5-12-13 is a right triangle, area = (5*12)/2 = 30
    9: '13',   // Fibonacci sequence
    10: '3628800' // 10! = 3,628,800
};

export async function POST(request: Request) {
    try {
        const { groupId, teamId } = await request.json();

        if (!groupId || !teamId) {
            return NextResponse.json(
                { error: 'Missing groupId or teamId' },
                { status: 400 }
            );
        }

        // Get the group document
        const groupRef = doc(db, 'groups', groupId);
        const groupDoc = await getDoc(groupRef);

        if (!groupDoc.exists()) {
            return NextResponse.json(
                { error: 'Group not found' },
                { status: 404 }
            );
        }

        const groupData = groupDoc.data();
        const teamAnswers = groupData[`${teamId}_teamrush`] || [];
        
        // Calculate correct answers
        let correctCount = 0;
        teamAnswers.forEach((answer: string, index: number) => {
            const questionNumber = index + 1;
            if (answer && answer.trim() === ANSWER_KEY[questionNumber]) {
                correctCount++;
            }
        });

        // Update the document with the correct count
        await updateDoc(groupRef, {
            [`${teamId}_correct_TR`]: correctCount
        });

        return NextResponse.json({
            success: true,
            correctAnswers: correctCount,
            totalQuestions: Object.keys(ANSWER_KEY).length
        });

    } catch (error) {
        console.error('Error validating team results:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
