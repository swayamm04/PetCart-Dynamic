import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/products.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const products = JSON.parse(fileContents);
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProduct = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const products = JSON.parse(fileContents);

        // Simple ID generation
        const id = (products.length + 1).toString();
        const productWithId = { ...newProduct, id, inStock: true };

        products.push(productWithId);


        await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));

        return NextResponse.json(productWithId);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
        }

        const fileContents = await fs.readFile(dataFilePath, 'utf8')
        let products = JSON.parse(fileContents)

        products = products.filter((p: { id: string }) => p.id !== id)

        await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2))

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 })
    }
}
