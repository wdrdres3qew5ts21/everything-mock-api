// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// ${protocol}${domain}${basePath}/secured/store/inventory
//https://cp4i-apic--d54ab496-gateway-cp4i-demo.apps.65d80e4b945cf30011ec4f8e.cloud.techzone.ibm.com/ibm/sandbox/secured
require('dotenv').config()
console.log(process.env)
var express = require('express')
var bodyParser = require('body-parser')
var { graphql, buildSchema } = require("graphql")
var port = 3000
var app = express()
var { request, gql, GraphQLClient } = require('graphql-request');
const { createClient } = require('graphql-ws');
const { WebSocket } = require('ws');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
    // create user in req.body
})


app.get('/', jsonParser, function (req, res) {
    // create user in req.body
    res.send({"message": `${process.env.PARTNER_NAME} x IBM ไอบีเอ็ม`})
})

app.get('/api/patients', jsonParser, function (req, res) {
    // create user in req.body
    res.send([
      { "patient_id": "P1001", "name": "สมชาย ใจดี", "gender": "ชาย", "dob": "1985-06-15", "blood_type": "A+", "contact_info": { "phone": "0812345678", "email": "somchai@example.com" }, "insurance": "บัตรทอง" },
      { "patient_id": "P1002", "name": "ด.ญ. เอมิลี่ จัน", "gender": "หญิง", "dob": "2015-03-22", "blood_type": "B-", "guardian": "แอนนา จัน", "contact_info": { "phone": "0898765432", "email": "anna@example.com" }, "insurance": "ประกันเอกชน" },
      { "patient_id": "P1003", "name": "สมศักดิ์ ยิ้มแย้ม", "gender": "ชาย", "dob": "1990-01-01", "blood_type": "O+", "contact_info": { "phone": "0823456789", "email": "somsak@example.com" }, "insurance": "ประกันสังคม" },
      { "patient_id": "P1004", "name": "อนงค์ ศิริกาญจน์", "gender": "หญิง", "dob": "1975-12-12", "blood_type": "AB+", "contact_info": { "phone": "0834567890", "email": "anong@example.com" }, "insurance": "บัตรทอง" },
      { "patient_id": "P1005", "name": "ปกรณ์ ดีใจ", "gender": "ชาย", "dob": "1988-08-08", "blood_type": "A-", "contact_info": { "phone": "0845678901", "email": "pakorn@example.com" }, "insurance": "ประกันเอกชน" },
      { "patient_id": "P1006", "name": "สุดา อินทนนท์", "gender": "หญิง", "dob": "1999-09-09", "blood_type": "B+", "contact_info": { "phone": "0856789012", "email": "suda@example.com" }, "insurance": "บัตรทอง" },
      { "patient_id": "P1007", "name": "เคนจิ อิโตะ", "gender": "ชาย", "dob": "2001-03-05", "blood_type": "O-", "contact_info": { "phone": "0867890123", "email": "kenji@example.com" }, "insurance": "ประกันเอกชน" },
      { "patient_id": "P1008", "name": "ลินดา จาง", "gender": "หญิง", "dob": "1980-07-30", "blood_type": "A+", "contact_info": { "phone": "0878901234", "email": "linda@example.com" }, "insurance": "ประกันสังคม" },
      { "patient_id": "P1009", "name": "ทารีก อับดุล", "gender": "ชาย", "dob": "1978-11-11", "blood_type": "AB-", "contact_info": { "phone": "0889012345", "email": "tariq@example.com" }, "insurance": "ประกันเอกชน" },
      { "patient_id": "P1010", "name": "มีนา ลี", "gender": "หญิง", "dob": "2000-06-06", "blood_type": "B+", "contact_info": { "phone": "0890123456", "email": "mina@example.com" }, "insurance": "บัตรทอง" }
    ])
})


app.get('/api/queue', jsonParser, function (req, res) {
    // create user in req.body
    res.send([
      { "queue_id": "Q001", "department": "อายุรกรรม", "patient_id": "P1001", "status": "รอพบแพทย์", "estimated_wait_time_minutes": 10 },
      { "queue_id": "Q002", "department": "กุมารเวชกรรม", "patient_id": "P1002", "status": "กำลังตรวจ", "estimated_wait_time_minutes": 0 },
      { "queue_id": "Q003", "department": "โรคหัวใจ", "patient_id": "P1003", "status": "รอพบแพทย์", "estimated_wait_time_minutes": 20 },
      { "queue_id": "Q004", "department": "กระดูกและข้อ", "patient_id": "P1004", "status": "รอพบแพทย์", "estimated_wait_time_minutes": 15 },
      { "queue_id": "Q005", "department": "ผิวหนัง", "patient_id": "P1005", "status": "กำลังตรวจ", "estimated_wait_time_minutes": 0 },
      { "queue_id": "Q006", "department": "หู คอ จมูก", "patient_id": "P1006", "status": "รอพบแพทย์", "estimated_wait_time_minutes": 5 },
      { "queue_id": "Q007", "department": "จักษุวิทยา", "patient_id": "P1007", "status": "รอพบแพทย์", "estimated_wait_time_minutes": 25 },
      { "queue_id": "Q008", "department": "ฉุกเฉิน", "patient_id": "P1008", "status": "กำลังตรวจ", "estimated_wait_time_minutes": 0 },
      { "queue_id": "Q009", "department": "ระบบประสาท", "patient_id": "P1009", "status": "รอพบแพทย์", "estimated_wait_time_minutes": 30 },
      { "queue_id": "Q010", "department": "จิตเวช", "patient_id": "P1010", "status": "รอพบแพทย์", "estimated_wait_time_minutes": 12 }
    ])
})


app.get('/api/historical_symptoms', jsonParser, function (req, res) {
    // create user in req.body
    res.send([
      { "record_id": "HS001", "patient_id": "P1001", "date_recorded": "2025-05-01", "symptoms": ["ไข้", "ไอ"], "diagnosis": "ไข้หวัดใหญ่", "doctor": "นพ. ธนากร" },
      { "record_id": "HS002", "patient_id": "P1002", "date_recorded": "2025-05-03", "symptoms": ["ผื่น", "คัน"], "diagnosis": "ภูมิแพ้", "doctor": "พญ. สุภาพร" },
      { "record_id": "HS003", "patient_id": "P1003", "date_recorded": "2025-05-05", "symptoms": ["เจ็บหน้าอก", "หายใจลำบาก"], "diagnosis": "โรคหลอดเลือดหัวใจ", "doctor": "นพ. กิตติพงศ์" },
      { "record_id": "HS004", "patient_id": "P1004", "date_recorded": "2025-05-07", "symptoms": ["ปวดหลัง"], "diagnosis": "กล้ามเนื้ออักเสบ", "doctor": "พญ. ชลิดา" },
      { "record_id": "HS005", "patient_id": "P1005", "date_recorded": "2025-05-09", "symptoms": ["เจ็บคอ", "น้ำมูกไหล"], "diagnosis": "หวัด", "doctor": "นพ. อนันต์" },
      { "record_id": "HS006", "patient_id": "P1006", "date_recorded": "2025-05-11", "symptoms": ["การได้ยินลดลง"], "diagnosis": "ติดเชื้อในหู", "doctor": "พญ. สุวิมล" },
      { "record_id": "HS007", "patient_id": "P1007", "date_recorded": "2025-05-13", "symptoms": ["มองไม่ชัด"], "diagnosis": "อาการล้าทางสายตา", "doctor": "นพ. มีชัย" },
      { "record_id": "HS008", "patient_id": "P1008", "date_recorded": "2025-05-15", "symptoms": ["คลื่นไส้", "อาเจียน"], "diagnosis": "อาหารเป็นพิษ", "doctor": "พญ. รัชดา" },
      { "record_id": "HS009", "patient_id": "P1009", "date_recorded": "2025-05-17", "symptoms": ["เวียนหัว", "ปวดหัว"], "diagnosis": "ไมเกรน", "doctor": "พญ. โสรยา" },
      { "record_id": "HS010", "patient_id": "P1010", "date_recorded": "2025-05-19", "symptoms": ["นอนไม่หลับ", "วิตกกังวล"], "diagnosis": "ความเครียด", "doctor": "พญ. กาญจนา" }
    ])

})

app.get('/api/nurses', jsonParser, function (req, res) {
    // create user in req.body
    res.send([
      { "nurse_id": "N9001", "name": "พยาบาลอริสา", "department": "ฉุกเฉิน", "shift": "เช้า", "phone_extension": "1201" },
      { "nurse_id": "N9002", "name": "พยาบาลสุดา", "department": "อายุรกรรม", "shift": "เย็น", "phone_extension": "1202" },
      { "nurse_id": "N9003", "name": "พยาบาลมาลี", "department": "กุมารเวชกรรม", "shift": "กลางคืน", "phone_extension": "1203" },
      { "nurse_id": "N9004", "name": "พยาบาลกฤษณ์", "department": "โรคหัวใจ", "shift": "เช้า", "phone_extension": "1204" },
      { "nurse_id": "N9005", "name": "พยาบาลธิดา", "department": "กระดูกและข้อ", "shift": "เย็น", "phone_extension": "1205" },
      { "nurse_id": "N9006", "name": "พยาบาลโจ", "department": "หู คอ จมูก", "shift": "กลางคืน", "phone_extension": "1206" },
      { "nurse_id": "N9007", "name": "พยาบาลน้ำ", "department": "ผิวหนัง", "shift": "เช้า", "phone_extension": "1207" },
      { "nurse_id": "N9008", "name": "พยาบาลแอน", "department": "จักษุวิทยา", "shift": "เย็น", "phone_extension": "1208" },
      { "nurse_id": "N9009", "name": "พยาบาลปีเตอร์", "department": "ระบบประสาท", "shift": "กลางคืน", "phone_extension": "1209" },
      { "nurse_id": "N9010", "name": "พยาบาลมี", "department": "จิตเวช", "shift": "เช้า", "phone_extension": "1210" }
    ])

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})