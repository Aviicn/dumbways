const testimonialData = [
    {
        author: "-Ji chang wook-",
        content: "keren banget jasanya!",
        image: "img/bang ichang.jpeg",
        rating: 5,
    },
    {
        author: "-Seojun-",
        content: "kerenlah pokoknya!",
        image: "img/psj2.jpeg",
        rating: 4,
    },
    {
        author: "-Kim young dae-",
        content: "The best pelayanannya!",
        image: "img/sweety.jpeg",
        rating: 4,
    },
    {
        author: "-Nam joohyuk-",
        content: "oke lah!",
        image: "img/vigilante.jpeg",
        rating: 3,
    },
    {
        author: "-Han yi chan-",
        content: "Apa apaan ini!",
        image: "img/yichan.jpeg",
        rating:1 ,
    },
]

function allTestimonials() {
    let testimonialHTML = ""

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
    const testimonialsFiltered = testimonialData.filter((item) =>(
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
    console.log("data terfiter",testimonialsFiltered[0])
    }

