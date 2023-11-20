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
    let startDate = new Date(document.getElementById("startDate").value)
    let endDate = new Date(document.getElementById("endDate").value)
    const jarakWaktuMillis = Math.abs(endDate - startDate);

    // Konversi jarak waktu menjadi hari, jam, menit, dan detik
    let hari = Math.floor(jarakWaktuMillis / (1000 * 60 * 60 * 24));
    let jam = Math.floor((jarakWaktuMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let menit = Math.floor((jarakWaktuMillis % (1000 * 60 * 60)) / (1000 * 60));
    let detik = Math.floor((jarakWaktuMillis % (1000 * 60)) / 1000);
    let bulan = Math.round(hari/30);

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
        bulan:bulan,
        hari: hari,
        jam:jam,
        menit:menit,
        detik:detik,
        content: inputContent,
        image: inputImage,
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
    document.getElementById("judul").innerHTML = '<div style="justify-content: center; flex-direction: column; display:flex; align-items: center;"><h1>My Project</h1></div>'
    document.getElementById("contents").innerHTML = ''

    for (let index = 0; index < dataBlog.length; index++) {
        document.getElementById("contents").innerHTML += `
        <div  class="blog-list-item" >
            <div class="blog-image">
                <img src="${dataBlog[index].image}" alt="" />
            </div>
            <div class="blog-content">
                
                <h1>
                    <a href="project-detail.html" >${dataBlog[index].title}</a>
                </h1>
                <p>Durasi : ${dataBlog[index].bulan} Bulan</p>
                
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