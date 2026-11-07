import { db } from 'hatchable';
export const access = 'admin';
export const methods = ['GET','POST','PATCH','DELETE'];
export default async function(req,res){
 if(req.method==='GET'){const {rows}=await db.query('SELECT * FROM products ORDER BY created_at DESC');return res.json(rows);}
 const b=req.body||{};
 if(req.method==='POST'){if(!b.name||!b.category||!b.image_url||!Number.isInteger(Number(b.price))||Number(b.price)<=0)return res.status(400).json({error:'Enter product name, category, positive price and image URL.'});const {rows}=await db.query('INSERT INTO products(name,category,price,image_url,tag) VALUES($1,$2,$3,$4,$5) RETURNING *',[b.name,b.category,Number(b.price),b.image_url,b.tag||'NEW']);return res.status(201).json(rows[0]);}
 if(req.method==='PATCH'){if(!b.id||!b.status)return res.status(400).json({error:'Product id and active status required.'});const {rows}=await db.query('UPDATE products SET active=$2,updated_at=now() WHERE id=$1 RETURNING *',[b.id,b.status==='active']);return res.json(rows[0]||null);}
 if(req.method==='DELETE'){if(!b.id)return res.status(400).json({error:'Product id required.'});await db.query('DELETE FROM products WHERE id=$1',[b.id]);return res.json({ok:true});}
}