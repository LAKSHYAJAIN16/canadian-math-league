import { NextResponse } from 'next/server';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/config';

// Define the correct answers for the individual round
const CORRECT_ANSWERS: Record<number, string> = {
    1: "D",
    2: "B",
    3: "A",
    4: "C",
    5: "D",
    6: "B",
    7: "A",
    8: "C",
    9: "D",
    10: "B",
    11: "A",
    12: "C",
    13: "D",
    14: "B",
    15: "A",
    16: "C",
    17: "D",
    18: "B",
    19: "A",
    20: "C"
};

export async function POST(request: Request) {
    try {
        const { userId, answers } = await request.json();

        if (!userId || !answers) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calculate correct answers
        let correctCount = 0;
        Object.entries(answers).forEach(([questionNum, answer]) => {
            const questionNumber = parseInt(questionNum);
            if (CORRECT_ANSWERS[questionNumber] === answer) {
                correctCount++;
            }
        });
        console.log(correctCount)
        console.log(userId);

        // Update the user's document
        const userDocRef = doc(db, 'competition', userId);
        await updateDoc(userDocRef, {
            correct_individual_answers: correctCount,
            last_updated: new Date().toISOString()
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error validating results:', error);
        return NextResponse.json(
            { error: 'Failed to validate results' },
            { status: 500 }
        );
    }
}
