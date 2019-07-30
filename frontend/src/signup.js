function studentSignup(){
    const signupStudent = document.getElementById('signup-student')
    signupStudent.addEventListener('submit', function(e){
        e.preventDefault()
        const body = {
            "first_name": e.target.firstname.value, 
            "last_name": e.target.lastname.value,
            "email": e.target.email.value, 
            "year": e.target.year.value, 
            "major": e.target.major.value
        }
        studentAdapter.post(body)
        .then(student => {
            if (student.error){
                alert(JSON.stringify(student.error.join('\n')))
            } else {
                displayStudentHomePage(student)
            }
        })
    })
}

function orgSignup(){
    const signupOrg = document.getElementById('signup-org')
    signupOrg.addEventListener('submit', function(e){
        e.preventDefault()
        const body = {
            "name": e.target.name.value, 
            "email": e.target.email.value, 
            "description": e.target.description.value
        }
        orgAdapter.post(body)
        .then(org => {
            if (org.error){
                alert(JSON.stringify(org.error.join('\n')))
            } else {
                displayOrgHomePage(org)
            }
        })
    })
}