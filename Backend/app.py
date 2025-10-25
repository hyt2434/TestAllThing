import os
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# 1) Load env
load_dotenv()

# 2) Tạo app & cấu hình DB
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")  # ví dụ: postgresql+psycopg2://user:pass@host:5432/db
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# 3) Định nghĩa 1 bảng đơn giản (items)
class Item(db.Model):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 4) Tạo bảng nếu chưa có (làm 1 lần khi app khởi động)
with app.app_context():
    db.create_all()

# 5) API cơ bản

@app.get("/api/health")
def health():
    return {"status": "ok"}, 200

# GET /api/items -> trả về danh sách
@app.get("/api/items")
def list_items():
    items = Item.query.order_by(Item.id.desc()).all()
    data = [{"id": it.id, "name": it.name, "created_at": it.created_at.isoformat()} for it in items]
    return jsonify(data), 200

# GET /api/items/<id> -> trả về 1 item
@app.get("/api/items/<int:item_id>")
def get_item(item_id: int):
    it = Item.query.get(item_id)
    if not it:
        return {"error": "Not found"}, 404
    return {"id": it.id, "name": it.name, "created_at": it.created_at.isoformat()}, 200

# POST /api/items -> tạo item mới (body: { "name": "..." })
@app.post("/api/items")
def create_item():
    payload = request.get_json() or {}
    name = (payload.get("name") or "").strip()
    if not name:
        return {"error": "Field 'name' is required"}, 400

    it = Item(name=name)
    db.session.add(it)
    db.session.commit()
    return {"id": it.id, "name": it.name, "created_at": it.created_at.isoformat()}, 201

if __name__ == "__main__":
    # chạy dev server
    app.run(debug=True, port=5000)
