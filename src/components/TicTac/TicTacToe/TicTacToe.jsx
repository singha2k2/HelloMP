import React, { useRef, useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = ({ videoUrl = "./video/ttt.mp4" }) => {

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [stats, setStats] = useState({ X: 0, O: 0, totalGames: 0 });
    let [currentPlayer, setCurrentPlayer] = useState('x'); // Track the current player
    let titleRef = useRef(null);

    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    useEffect(() => {
        if (currentPlayer === 'o' && !lock) {
            const emptyIndices = data
                .map((value, index) => (value === "" ? index : null))
                .filter((val) => val !== null);
            if (emptyIndices.length > 0) {
                setTimeout(() => {
                    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                    makeMove(randomIndex);
                }, 1000); // Delay of 1 second
            }
        }
    }, [currentPlayer, lock]);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        makeMove(num);
    };

    const makeMove = (num) => {
        if (data[num] === "") {
            data[num] = currentPlayer;
            box_array[num].current.innerHTML = `<img src='${currentPlayer === 'x' ? cross_icon : circle_icon}'>`;
            setCount(++count);
            checkWin();
            setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
        }
    };

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }

        if (data.every((cell) => cell !== "")) {
            // If all cells are filled and there is no winner
            titleRef.current.innerHTML = `It's a Draw!`;
            setStats({ 
                ...stats, 
                X: stats.X + 1, 
                O: stats.O + 1, 
                totalGames: stats.totalGames + 1 
            });
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === 'x') {
            titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon}> Wins`;
            setStats({ 
                ...stats, 
                X: stats.X + 1, 
                totalGames: stats.totalGames + 1 
            });
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon}> Wins`;
            setStats({ 
                ...stats, 
                O: stats.O + 1, 
                totalGames: stats.totalGames + 1 
            });
        }
    };

    const reset = () => {
        setLock(false);
        setCurrentPlayer('x');
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        
        box_array.forEach((e) => {
            e.current.innerHTML = "";
        });
    };

    return (
        <>
            <div className='ticcontainer'>
                <h1 className="tictitle" style={{ color: "white" }} ref={titleRef}>The Tic Tac Toer (with Computer)</h1>
                <div className="board">
                    <div className="row1">
                        <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                        <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                        <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                    </div>
                    <div className="row2">
                        <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                        <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                        <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                    </div>
                    <div className="row3">
                        <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                        <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                        <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                    </div>
                </div>
                <button className="reset" onClick={() => { reset() }}>Reset</button>
            </div>
            <div className='score-container'>
                <h2 style={{ color: "white" }}>Game Statistics</h2>
                <p style={{ color: "white" }}>Total Games Played: {stats.totalGames}</p>
                <p style={{ color: "white" }}>X Wins: {stats.X}</p>
                <p style={{ color: "white" }}>O Wins: {stats.O}</p>
            </div>
        </>
    );
};

export default TicTacToe;
