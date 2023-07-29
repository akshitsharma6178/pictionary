import { useEffect, useState} from "react"
import {io} from 'socket.io-client'

export function Drawer( ) {
    const [ctx, setCtx] = useState(null);
    const [isDraw, setDraw] = useState(false);
    const [canvasOffsetX, setCanvasOffsetX] = useState(null);
    const [canvasOffsetY, setCanvasOffsetY] = useState(null);
    const socket =io('http://127.0.0.1:3001');
    useEffect(() => {
        let innerDrawer = document.getElementById('drawing-board')
        if(innerDrawer){  
            setCtx(innerDrawer.getContext('2d'))  
            setCanvasOffsetX(innerDrawer.offsetLeft);
            setCanvasOffsetY(innerDrawer.offsetTop);
            innerDrawer.width = innerDrawer.clientWidth - canvasOffsetX;
            innerDrawer.height = innerDrawer.clientHeight - canvasOffsetY;
            // innerDrawer.width = window.innerWidth - canvasOffsetX;
            // innerDrawer.height = window.innerHeight - canvasOffsetY
        }
    },[canvasOffsetX, canvasOffsetY])

    useEffect(() => {
      socket.on("draw",(data) => {
        if(data){
          setDraw(data.isDraw)
          // console.log(data.x - canvasOffsetX, data.y -canvasOffsetY)
          ctx.lineTo(data.x, data.y);
          ctx.stroke();
          // ctx.beginPath();
        }
      },[socket])
    })
    const draw = (e) => {
        if(!isDraw) return
        // ctx.lineWidth = 5;
        // ctx.lineCap = 'round'
        // ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
        // ctx.stroke();
        let data = {
          'isDraw': isDraw,
          'x': e.clientX - canvasOffsetX,
          'y': e.clientY - 1.5 * canvasOffsetY
        }
        socket.emit("draw", data)
    }

    const paint = () => {
        setDraw(true);
    }
    const stopPaint = () =>{
        setDraw(false)
        // ctx.stroke();
        ctx.beginPath();
    } 

    return(
        <>
        <div className="border-2 w-[80%]">
            <canvas className="border-2 h-[30rem] w-full"id="drawing-board" onMouseLeave={()=>stopPaint()} onMouseDown={(e)=> paint(e)} onMouseUp={() => stopPaint()} onMouseMove={(e) => draw(e)}></canvas>
        </div>
        </>
    )
}