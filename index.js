const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

process.title = "Server"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

function authenticate(username,password){
	  this.auth=true;
		pool.query('SELECT EXISTS (SELECT * FROM doctors WHERE username = $1 AND password = $2)', [username, password], (error, results) => {
		if (error) {
			this.auth=false;
			throw error
		}
		console.log('Doctor authentication: ' + results.rows[0].exists)
		if (!results.rows[0].exists) {
			 response.status(200).json("Wrong credentials.")
			 this.auth=false;
		}else{
			this.auth=true;
		}

	})
		return auth;
	
}

const getPatients = (request, response) => {
	const username = request.params.doctor_username
			pool.query('SELECT * FROM patients WHERE doctor_id=(SELECT user_id FROM doctors WHERE username=$1)', [username], (error, results) => {
				if (error) {
					throw error
				}
				response.status(200).json(results.rows)
			})
}

const submitQuestionnaire = (request, response) => {
	const id = request.params.id
	const answer1 = request.params.answer1
	const answer2 = request.params.answer2
			pool.query('INSERT INTO questionnaire(answers, created_on, patient_id) VALUES (ARRAY[$1,$2]::BIT(3)[], CURRENT_TIMESTAMP(0), $3);', [answer1, answer2, id], error => {
				if (error) {
					throw error
				}
				response.status(200).json({ status: 'success', message: 'Questionnaire answered. Patient Id: ' + id + ', answer: ' + answer1 + " " + answer2 })
			})
}
/*
const getPatientHoursAwake = (request, response) => {
	const patient_id = request.params.patient_id
	const day = request.params.day
	const month = request.params.month
	const year = request.params.year
	const startDate = year + '-' + month + '-' + day
	const endDate = year + '-' + month + '-' + (day+10000)
	//Validate doctor
	if(authenticate(request.params.username,request.params.password)){
			pool.query('SELECT * FROM questionnaire WHERE (patient_id=$1 AND created_on between $2 and $3)', [patient_id, startDate, endDate], (error, results) => {
				if (error) {
					throw error
				}
				
				min = 99
				max = 0
				for (i = 1; i < results.rows.length; i++) {
					date = new Date(results.rows[i].created_on.valueOf())
					hours = date.getHours()
					if (hours >= max) {max = hours}
					if (hours <= min) {min = hours}
				}
				answer = max - min
				console.log('GetPatientHoursAwake answer: ' + answer)
				response.status(200).json(answer)
			})
		} else {
			console.log('SMTH WRONG')
		}

}
*/
 function queryWell(pid,start,end){
	this.res=[]
	pool.query('SELECT DATE(created_on),count(created_on) FROM questionnaire WHERE (patient_id=$1 AND created_on between $2 and $3 AND answers[1]=$4) GROUP BY DATE(created_on)', [pid, start, '2020-03-07', '001'], (error, results) => {
					if (error) {
						throw error
					}
					for (var i=0;i<results.rows.length;i++){
					results.rows[i].count=results.rows[i].count/2
					}
					var json=JSON.stringify(results.rows)
					var obj=JSON.parse(json)
					console.log(json)
				})
}
const getPatientIsWellHours = (request, response) => {
	//const username = request.params.username
	//const password = request.params.password
	const patient_id = request.params.patient_id
	const startDate =new Date(request.params.startDate)
	const endDate = new Date(request.params.endDate)	const day = request.params.day
	
	
		//if(authenticate(username,password)){
		queryWell(patient_id,startDate,endDate)
	//}else{
	//	console.log("Wrong credentials")
	//}
}
function queryNotWalking(pid,start,end){
	this.res=[]
	pool.query('SELECT DATE(created_on),count(created_on) FROM questionnaire WHERE (patient_id=$1 AND created_on between $2 and $3 AND answers[2]=$4) GROUP BY DATE(created_on)', [pid, start, '2020-03-07', '001'], (error, results) => {
					if (error) {
						throw error
					}
					for (var i=0;i<results.rows.length;i++){
					results.rows[i].count=results.rows[i].count/2
					}
					var json=JSON.stringify(results.rows)
					console.log(json)

				})
}
const getPatientNotWalkingHours = (request, response) => {
	//const username = request.params.username
	//const password = request.params.password

	const patient_id = request.params.patient_id
	const startDate =new Date(request.params.startDate)
	const endDate = new Date(request.params.endDate)
	//Validate doctor
	//if(authenticate(username,password)){
		queryNotWalking(patient_id,startDate,endDate)
	//}else{
	//	console.log("Wrong credentials")
	//}
}
 function queryDiff(pid,start,end){
	this.res=[]
	pool.query('SELECT DATE(created_on),count(created_on) FROM questionnaire WHERE (patient_id=$1 AND created_on between $2 and $3 AND answers[2]=$4) GROUP BY DATE(created_on)', [pid, start, '2020-03-07', '010'], (error, results) => {
					if (error) {
						throw error
					}
					for (var i=0;i<results.rows.length;i++){
					results.rows[i].count=results.rows[i].count/2
					}
					var json=JSON.stringify(results.rows)
					console.log(json)
				})
}
const getPatientSlowAndDifficultWalkingHours = (request, response) => {
	//const username = request.params.username
	//const password = request.params.password
	const patient_id = request.params.patient_id
	const startDate =new Date(request.params.startDate)
	const endDate = new Date(request.params.endDate)
	//Validate doctor
	//if(authenticate(username,password)){
		queryDiff(patient_id,startDate,endDate)
	//}else{
		//console.log("Wrong credentials")
	//}

}
function queryHyperactivity(pid,start,end){
	this.res=[]
	pool.query('SELECT DATE(created_on),count(created_on) FROM questionnaire WHERE (patient_id=$1 AND created_on between $2 and $3 AND answers[2]=$4) GROUP BY DATE(created_on)', [pid, start, '2020-03-07', '011'], (error, results) => {
					if (error) {
						throw error
					}
					for (var i=0;i<results.rows.length;i++){
					results.rows[i].count=results.rows[i].count/2
					}
					var json=JSON.stringify(results.rows)
					console.log(json)

				})
}
const getPatientHyperactivityHours = (request, response) => {
	//const username = request.params.username
	//const password = request.params.password
	const patient_id = request.params.patient_id
	const startDate =new Date(request.params.startDate)
	const endDate = new Date(request.params.endDate)
	//Validate doctor
	//if(authenticate(username,password)){
		queryHyperactivity(patient_id,startDate,endDate)
	//}else{
		//console.log("Wrong credentials")
	//}
}



app.get('/SubmitQuestionnaire/:patient_id/:answer1/:answer2', submitQuestionnaire)
app.get('/getPatients/:doctor_username', getPatients)
app.get('/GetPatientHoursAwake/:patient_id/:startDate/:endDate', getPatientHoursAwake)
app.get('/GetPatientIsWellHours/:patient_id/:startDate/:endDate', getPatientIsWellHours)
app.get('/GetPatientNotWalkingHours/:patient_id/:startDate/:endDate', getPatientNotWalkingHours)
app.get('/GetPatientSlowAndDifficultWalkingHours/:patient_id/:startDate/:endDate', getPatientSlowAndDifficultWalkingHours)
app.get('/GetPatientHyperactivityHours/:patient_id/:startDate/:endDate', getPatientHyperactivityHours)

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening`)
})