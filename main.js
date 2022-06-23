const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const player =$('.player')
const heading = $('header h2')
const cdThumd=$('.cd-thumb')
const audio=$('#audio') 
const playBtn= $('.btn-toggle-play')
const progress=$('#progress')
const nextBtn=$('.btn-next')
const previousBtn =$('.btn-prev')
const randomBtn=$('.btn-random')
const repeatBtn=$('.btn-repeat')
const playlist= $('.playlist')
const app={
    isPlaying:true,
    curentIndex:0,  
    isRandom:false,
    isRepeat:false,
    isactive:false,
    songs:[
        {
          name:'Bao tiền một mớ bình yên',
          singer:'14Casper x Bon',
          path:'./song/song1.mp3',
          image:'./music_img/img1.jpg'
        },
        {
            name:'Đường tôi chở em về',
            singer:'buitruonglinh',
            path:'./song/song2.mp3',
            image:'./music_img/img2.jpg'
          },
          {
            name:'Ánh sao và bầu trời',
            singer:'Tri x Cá',
            path:'./song/song3.mp3',
            image:'./music_img/img3.jpg'
          },
          {
            name:'Sau tất cả',
            singer:'Erik',
            path:'./song/song4.mp3',
            image:'./music_img/img4.jpg'
          },
          {
            name:'Em bé',
            singer:'Amee x Karik',
            path:'./song/song5.mp3',
            image:'./music_img/img5.webp'
          },
          {
            name:'Xe đạp',
            singer:'Chalres cover',
            path:'./song/song6.mp3',
            image:'./music_img/img6.jpg'
          },
    ],

    render: function() {
      const htmls = this.songs.map((song,index) => {
        return `
        <div class="song ${this.curentIndex==index ? 'active' : ''}">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
        `
      })
     playlist.innerHTML=htmls.join('')     
    const songonclick=$$('.song')
    songonclick.forEach((element,index) => {
       element.onclick=function () {
        app.curentIndex=index
        app.LoadcurrentSong()
        app.render()
        audio.play()
       }
    });
      
    },

    
    handleEvents : function () {
      // nextSong
       nextBtn.onclick =function () {
        if (app.isRandom) {
          app.randomSong()
          audio.play()
        } else {
          app.nextSong()
          audio.play()
           cdThumdAnimate.play()
           app.render()
           app.getintoView()
        }
       }

      // previous song 

      previousBtn.onclick = function () {
        if (app.isRandom) {
          app.randomSong()
          audio.play()
        } else {
          app.previousSong()
          }
          
          audio.play()
          cdThumdAnimate.play()
          app.render()
          app.getintoView()
        }
        

      //random song
         randomBtn.onclick = function () {
           app.isRandom=!app.isRandom
           randomBtn.classList.toggle('active')
           
         }

        // repeat song
        repeatBtn.onclick = function () {
          app.isRepeat=!app.isRepeat
          repeatBtn.classList.toggle('active')
          
        }  
      //  song ened

      audio.onended = function () {

        if (app.isRepeat) {
         app.LoadcurrentSong()
         audio.play()
         cdThumdAnimate.play()
        }
        else {
            app.nextSong()
            audio.play()
        }


        if (app.isRandom) {
          app.randomSong()
          app.render()
          audio.play()
        } 
        }
      
      // Phóng to thu nhỏ cd
        const cd=$('.cd')
        const cdWidth=cd.offsetWidth
         document.onscroll= function () {
          const scroolTop= window.scrollY || document.documentElement.scrollTop
          const newcdWidth=cdWidth - scroolTop
          cd.style.width= newcdWidth>0 ?  newcdWidth+'px' : 0
          cd.style.opacity=newcdWidth / cdWidth }

          // xu li cd quay
 
         const cdThumdAnimate =cdThumd.animate([
            {transform : 'rotate(360deg)'}
         ],{
          duration : 10000,
          Intersections :Infinity
         }) 

         cdThumdAnimate.pause()

        
        // Xử lí khi play      
           playBtn.onclick=function () {     
            if(app.isPlaying) {
              audio.play()  
            }
          else {
               audio.pause()
               }
            
          }
          //  khi song play
          audio.onplay =function () {
            app.isPlaying=false
            player.classList.add('playing') 
            cdThumdAnimate.play()
          }
          // khi song pause

          audio.onpause=function () {
            app.isPlaying=true
            player.classList.remove('playing')
            cdThumdAnimate.pause()
         }

         //Xử lí khi tua song
        
            
           progress.onchange = function (e) {
                const Timecurrent= e.target.value/ 100 * audio.duration
                audio.currentTime=Timecurrent
                progress.value =Math.floor(audio.currentTime / audio.duration *100)
           }


        //  khi tiến độ bài hát thay đổi

        audio.ontimeupdate = function () {
         const progressValue =  Math.floor(audio.currentTime / audio.duration *100)
         progress.value = progressValue
        cdThumdAnimate.play()
        }

    },

    LoadcurrentSong : function () {
         heading.textContent=this.songs[this.curentIndex].name
         cdThumd.style.backgroundImage =`url(${this.songs[this.curentIndex].image})`
         audio.src=this.songs[this.curentIndex].path 
    },

    nextSong: function () {
        this.curentIndex++
        if(this.curentIndex>=this.songs.length) {
          this.curentIndex=0
        }
        this.LoadcurrentSong()
       

    },

    previousSong :  function () {  
         if (this.curentIndex==0) {
          this.curentIndex=this.songs.length-1
         } else {
          this.curentIndex--
         }

         this.LoadcurrentSong()

    },

    randomSong : function () {
     
        do {
           var randomindex =Math.floor(Math.random()*this.songs.length)
        }
        while (this.curentIndex==Math.floor(Math.random()*this.songs.length))
        this.curentIndex=randomindex
        app.getintoView()
        this.LoadcurrentSong()

    },
    getintoView : function () {
        setTimeout( () => {
         $('.song.active').scrollIntoView(
          {
            behavior:'smooth',
            block:'nearest'
          }
        ) }
          
          ,300)
    },

    start: function() {

      
      //  load bai hat hien tai
      this.LoadcurrentSong()
      //  render ra giao diện
      this.render()
      //  Xử lí sự kiện
        this.handleEvents()
    
    }
  }

app.start(
)