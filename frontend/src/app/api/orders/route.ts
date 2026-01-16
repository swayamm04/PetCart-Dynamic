import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/orders.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const orders = JSON.parse(fileContents);
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, status } = await request.json();
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const orders = JSON.parse(fileContents);

        const orderIndex = orders.findIndex((o: { id: string }) => o.id === id);
        if (orderIndex === -1) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        orders[orderIndex].status = status;

        await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2));

        return NextResponse.json(orders[orderIndex]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
