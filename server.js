console.log("ESTE ES EL SERVER CORRECTO 🚀");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config/db");

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});


// ========================================
// ============== REGISTER ===============
// ========================================
app.post("/register", async (req, res) => {
    console.log("📥 Register recibido:", req.body);

    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

        db.query(sql, [nombre, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("❌ Error MySQL:", err);
                return res.status(500).json({ message: "Error al registrar usuario" });
            }

            res.status(201).json({ message: "Usuario registrado correctamente ✅" });
        });

    } catch (error) {
        console.error("❌ Error servidor:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});


// ========================================
// =============== LOGIN =================
// ========================================
app.post("/login", (req, res) => {
    console.log("📥 Login recibido:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.error("❌ Error MySQL:", err);
            return res.status(500).json({ message: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const usuario = results[0];

        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            "secreto_super_seguro",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login exitoso ✅",
            token: token
        });
    });
});


// ===== SERVIDOR =====
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🔥`);
});