import { useEffect, useState} from "react"

export function Drawer() {

    const [ctx, setCtx] = useState(null);
    const [drawer, setDrawer] = useState(null);
    const [isDraw, setDraw] = useState(false);
    const [curretX, setCurrentX] = useState(null);
    const [curretY, setCurrentY] = useState(null);
    // const Socket
    const [canvasOffsetX, setCanvasOffsetX] = useState(null);
    const [canvasOffsetY, setCanvasOffsetY] = useState(null);
    const data = {};
    // const drawer = useRef(null);
    useEffect(() => {
        // document.getElementById('drawing-board'))
        let innerDrawer = document.getElementById('drawing-board')
        const data = {
          x: 100,
          y: 100,
        }
        const data2={
          x: 500,
          y: 500
        }
          // let points = JSON.parse(data)
        // WebSocket.onChange((data) => {
        //   let points = JSON.parse(data)
        //   ctx.lineTo(points.x,points.y)
        //   ctx.stroke()
        //   ctx.beginPath()
        // })
        if(innerDrawer){  
            setCtx(innerDrawer.getContext('2d'))  
            setCanvasOffsetX(innerDrawer.offsetLeft);
            setCanvasOffsetY(innerDrawer.offsetTop);
            if(ctx){
              ctx.lineWidth = 5
              ctx.lineCap = 'round'
              ctx.lineTo(100-canvasOffsetX,100-canvasOffsetY)
              ctx.stroke()
              ctx.lineTo(128-canvasOffsetX,128-canvasOffsetY)
              ctx.stroke()
            }
            innerDrawer.width = innerDrawer.clientWidth - canvasOffsetX;
            innerDrawer.height = innerDrawer.clientHeight - canvasOffsetY;
            setDrawer(innerDrawer)
        }
    },[canvasOffsetX, canvasOffsetY, ctx])

    const draw = (e) => {
        if(!isDraw) return
        ctx.lineWidth = 5;
        ctx.lineCap = 'round'
        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
        ctx.stroke();
    }

    const paint = (e) => {
        setDraw(true);
        console.log('X', e.clientX)
        console.log('Y', e.clientY)
        // data.x = e.clientX;
        // data.y = e.clientY;
    }
    const stopPaint = () =>{
        setDraw(false)
        ctx.stroke();
        ctx.beginPath();
    } 

    

      
    return(
        <>
        <div className="border-2">
            <canvas className="border-2 h-[25rem] w-[25rem]"id="drawing-board" onMouseLeave={()=>stopPaint()} onMouseDown={(e)=> paint(e)} onMouseUp={() => stopPaint()} onMouseMove={(e) => draw(e)}></canvas>
        </div>
        </>
    )
}