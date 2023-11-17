const janji = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.npoint.io/88b89eb6a5c57443f901', true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            //console.log("berhasil", xhr.response)
            resolve( JSON.parse(xhr.response))
        } else {
            //console.log("gagal", xhr.response)
            reject(xhr.responseText)
        }
    }

    xhr.onerror = () => {
        reject("Network error!")
        //console.log("Network error! please check your internet connection")
    }
    xhr.send()
})

let testimonialData =""

async function allTestimonials() {
    let testimonialHTML = ""
     testimonialData = await janji
    
    console.log(testimonialData)
       
    testimonialData.forEach((item) => (
        testimonialHTML += `
        <div class="testimonial-container">
        <img src="${item.image}" class="testimonial-image" /> 
        <p class ="testimonial-text"> ${item.content}</p>
        <p class ="testimonial-author"> ${item.author}</p>
        <p class ="testimonial-author"> ${item.rating} <i class="fa -solid fa-star"></i></p>
        </div>`
    ))

    document.getElementById("testimonials").innerHTML = testimonialHTML

}

allTestimonials()

function filterTestimonials(rating) {
    const testimonialsFiltered = testimonialData.filter((item) => (
        item.rating === rating
    ))

    let testimonialHTML = ""
    testimonialsFiltered.forEach((item) => (
        testimonialHTML += `
        <div style="width: 260px; height: 100px; display="row" class="testimonial-container">
        <img src="${item.image}" class="testimonial-image" /> 
        <p class ="testimonial-text"> ${item.content}</p>
        <p class ="testimonial-author"> ${item.author}</p>
        <p class ="testimonial-author"> ${item.rating} <i class="fa -solid fa-star"></i></p>
        </div>`
    ))

    document.getElementById("testimonials").innerHTML = testimonialHTML
    console.log("data terfiter", testimonialsFiltered[0])
}

