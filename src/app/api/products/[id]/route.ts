import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URL;
if (!uri) {
    throw new Error("MongoDB connection string is undefined.");
}
const client = new MongoClient(uri);

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user._id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await client.connect();
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const products = await inventory.find({ userId: session.user._id }).toArray();
        return NextResponse.json(products);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const session = await getServerSession(authOptions);

        if (!session || !session.user._id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!body || !body.name || !body.category || !(body.price >= 0) || !(body.quantity >= 0)) {
            return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
        }

        await client.connect();
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const newProduct = {
            _id: new ObjectId(),
            name: body.name,
            category: body.category,
            price: body.price,
            quantity: body.quantity,
            userId: session.user._id // Associate with the authenticated user
        };

        await inventory.insertOne(newProduct);
        return NextResponse.json({ message: "Product added successfully!" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add product." }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function PUT(request: Request) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Extract the product ID from the URL
    const body = await request.json();
    const session = await getServerSession(authOptions);

    if (!id || !body || !body.name || !body.category || !(body.price >= 0) || !(body.quantity >= 0)) {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    try {
        if (!session || !session.user._id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await client.connect();
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const result = await inventory.updateOne(
            { _id: new ObjectId(id), userId: session.user._id }, // Ensure the user owns the product
            {
                $set: {
                    name: body.name,
                    category: body.category,
                    price: body.price,
                    quantity: body.quantity
                }
            }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: "Product not found or no changes made." }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated successfully!" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function DELETE(request: Request) {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Extract the product ID from the URL
    const session = await getServerSession(authOptions);

    if (!id) {
        return NextResponse.json({ error: "Product ID is missing." }, { status: 400 });
    }

    try {
        if (!session || !session.user._id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await client.connect();
        const database = client.db('stock');
        const inventory = database.collection('inventory');

        const result = await inventory.deleteOne({ _id: new ObjectId(id), userId: session.user._id }); // Ensure the user owns the product

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Product not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully!" });

    } catch (error: any) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: "Failed to delete product.", details: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}
