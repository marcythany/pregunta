import { MongoClient, ObjectId } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectDB() {
    if (!client.connect()) {
        await client.connect();
    }
    return client.db();
}

export async function getQuestions({ page = 1, limit = 10, category = null }) {
    const db = await connectDB();
    const skip = (page - 1) * limit;
    
    const query = category ? { category } : {};
    
    const [questions, total] = await Promise.all([
        db.collection('questions')
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray(),
        db.collection('questions').countDocuments(query)
    ]);

    return {
        questions,
        pagination: {
            page,
            totalPages: Math.ceil(total / limit),
            total
        }
    };
}

export async function createQuestion(questionData) {
    const db = await connectDB();
    const result = await db.collection('questions').insertOne({
        ...questionData,
        createdAt: new Date(),
        votes: 0,
        answers: []
    });
    return result;
}

export async function getQuestionById(id) {
    const db = await connectDB();
    return db.collection('questions').findOne({ _id: new ObjectId(id) });
}

export async function updateQuestion(id, updateData) {
    const db = await connectDB();
    const result = await db.collection('questions').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
    return result;
}

export async function deleteQuestion(id) {
    const db = await connectDB();
    const result = await db.collection('questions').deleteOne({ _id: new ObjectId(id) });
    return result;
}
