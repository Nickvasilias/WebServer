app.get('/SubmitQuestionnaire/:patient_id/:answer1/:answer2', submitQuestionnaire)
app.get('/getPatients/:doctor_username', getPatients)
app.get('/GetPatientHoursAwake/:patient_id/:startDate/:endDate', getPatientHoursAwake)
app.get('/GetPatientIsWellHours/:patient_id/:startDate/:endDate', getPatientIsWellHours)
app.get('/GetPatientNotWalkingHours/:patient_id/:startDate/:endDate', getPatientNotWalkingHours)
app.get('/GetPatientSlowAndDifficultWalkingHours/:patient_id/:startDate/:endDate', getPatientSlowAndDifficultWalkingHours)
app.get('/GetPatientHyperactivityHours/:patient_id/:startDate/:endDate', getPatientHyperactivityHours)