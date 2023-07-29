import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export function Drawer() {
    const [isDrawing, setIsDrawing] = useState(false); // Move the useState hook inside the functional component
    const socket = io('http://127.0.0.1:3001');

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        const context = canvas.getContext('2d');
        socket.on('draw', ({ isDrawing, x, y }) => {
            if (!isDrawing) return;
            context.lineTo(x, y);
            context.stroke();
        });
    }, [socket]);

    const mouseDown = (e) => {
        setIsDrawing(true);
        socket.emit('draw', { isDrawing: true, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    const mouseMove = (e) => {
        if (!isDrawing) return;
        socket.emit('draw', { isDrawing: true, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    const mouseUp = () => {
        setIsDrawing(false);
        socket.emit('draw', { isDrawing: false });
    }

    return(
        <>
            <span>
                isDrawing: {isDrawing.toString()}
            </span>
            <div>
                <canvas
                    width="800"
                    height="400"
                    style={{ border: '1px solid #ccc' }}
                    onMouseDown={mouseDown}
                    onMouseUp={mouseUp}
                    onMouseMove={mouseMove}
                ></canvas>
                <button onClick={()=>{console.log("clear")}}>Clear Canvas</button>
            </div>
        </>
    )
}