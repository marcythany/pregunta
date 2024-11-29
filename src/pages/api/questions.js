import { getQuestions, createQuestion, getQuestionById, updateQuestion, deleteQuestion } from '../../models/Question.js';

export async function GET({ request }) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const category = url.searchParams.get('category');
        
        const { questions, pagination } = await getQuestions({ 
            page, 
            category,
            limit: 10 
        });

        return new Response(JSON.stringify({ questions, pagination }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return new Response(JSON.stringify({ 
            error: 'Error fetching questions',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function POST({ request }) {
    try {
        const questionData = await request.json();
        const result = await createQuestion(questionData);
        
        return new Response(JSON.stringify(result), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error creating question:', error);
        return new Response(JSON.stringify({ 
            error: 'Error creating question',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function PUT({ request }) {
    try {
        const { id, ...updateData } = await request.json();
        const result = await updateQuestion(id, updateData);
        
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error updating question:', error);
        return new Response(JSON.stringify({ 
            error: 'Error updating question',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export async function DELETE({ request }) {
    try {
        const { id } = await request.json();
        const result = await deleteQuestion(id);
        
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error deleting question:', error);
        return new Response(JSON.stringify({ 
            error: 'Error deleting question',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}
