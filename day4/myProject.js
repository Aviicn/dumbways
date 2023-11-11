// LOOPING : FOR, WHILE, DO-WHILE

// FOR -> perulangan yang kamu sudah tau kapan harus berhenti
// for(let index = 0; index < 10; index++) { 
//     console.log("ini adalah index", index)
// }

// WHILE -> perulangan yang belum tentu kamu tau kapan harus berhenti (berdasarkan data dinamis)

// DO WHILE -> perulangan yang jalan dulu sekali, baru dicek

let dataBlog = []

function submitBlog(event) {
    event.preventDefault()

    let inputTitle = document.getElementById("inputTitle").value
    let inputContent = document.getElementById("inputContent").value
    let inputImage = document.getElementById("inputImage").files
    let startDate = document.getElementById("startDate").value
    let endDate = document.getElementById("endDate").value

    let technologi = document.querySelector("input[name=radio]:checked");

    console.log("title", technologi.id)
    console.log("content", inputContent)
    console.log("date", startDate)

    inputImage = URL.createObjectURL(inputImage[0])
    console.log("image", inputImage)

    const blog = {
        title: inputTitle,
        startDate: startDate,
        endDate: endDate,
        technologi: technologi.id,
        content: inputContent,
        image: inputImage,
        postAt: new Date(),
        author: "Avicienna"
    }
    
    dataBlog.push(blog)
    console.log("dataBlog", dataBlog)
    renderBlog()
}

function renderBlog() {
    document.getElementById("contents").innerHTML = '<div style="justify-content: center;"><h1>My Project</h1></div>'

    for (let index = 0; index < dataBlog.length; index++) {
        document.getElementById("contents").innerHTML += `
        <div class="blog-list-item">
            <div class="blog-image">
                <img src="${dataBlog[index].image}" alt="" />
            </div>
            <div class="blog-content">
                
                <h1>
                    <a href="project-detail.html" >${dataBlog[index].title}</a>
                </h1>
                <div class="detail-blog-content">
                    ${dataBlog[index].postAt} | ${dataBlog[index].author}
                </div>
                <p>
                   ${dataBlog[index].startDate} | ${dataBlog[index].endDate}
                </p>
                <p>
                    ${dataBlog[index].technologi}
                </p>
                <p>
                    ${dataBlog[index].content}
                </p>

                <img src="icon/google-play.svg" alt="" width="40px">
                <img src="icon/android1.png" alt="" width="40px">
                <img src="icon/java.svg" alt="" width="40px">

                <div>
                <button style="background-color: black; color: white; width: 100px;" >Edit</button>     
               <button style="background-color: black; color: white; width: 100px;" >Delete</button>
            </div>
            </div>
        </div>`
    }
}