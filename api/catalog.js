import { db } from 'hatchable';
export const access = 'public';
export const methods = ['GET'];
export default async function(req,res){const {rows}=await db.query('SELECT id,name,category,price,image_url AS image,tag FROM products WHERE active=true ORDER BY created_at DESC');res.json(rows);}