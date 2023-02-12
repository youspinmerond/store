export default async function handler(req:any,res:any) {
  const cookies = req.cookies
  res.status(200).json({cookies:{...cookies}})
}