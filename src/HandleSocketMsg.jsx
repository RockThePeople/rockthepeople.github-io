import { useEffect } from 'react'
import { startMining } from './Mining.jsx';

// Converted to a proper custom hook so React hooks are used from component render
export function useHandleSocketMsg(socket) {

    useEffect(() => {
        if (!socket) return;

        const messageHandler = async (res) => {
            switch (res.method) {
                case 'mining.notify':
                    jobParams = res.params;
                    // targetHash = jobParams[8]; // 이 줄 주석처리하면 테스트값
                    console.log(`JobParams Received { jobId : ${jobParams[0]} }`);
                    if (miningState[2]) {
                        await startMining(jobParams);
                    }
                    break;
                case 'mining.extraNonceAndDiff':
                    setEN1(res.result[1]);
                    difficulty = res.result[0][0][1]
                    break;
                case 'mining.authorizationConfirm':
                    console.log("authorization confirmed");
                    authFlag = true;
                    break;
                case 'submit.authError':
                    console.log(res.method);
                    break;
                case 'submit.noExtraNonce':
                    console.log(res.method);
                    break;
                case 'submit.responseResult':
                    if (res.result) {
                        console.log(`Submit Response : ${res.result}`);
                    } else {
                        console.log(`Submit Response : ${res.error[1]}`);
                    }
                    break;
                case 'mining.set_difficulty': break;
                default: break;
            }
        };

        const difficultyHandler = (msg) => {
            console.log(msg);
        }

        socket.on('message', messageHandler);
        socket.on('difficultyUpdate', difficultyHandler);

        return () => {
            // remove handlers and disconnect socket on cleanup
            socket.off('message', messageHandler);
            socket.off('difficultyUpdate', difficultyHandler);
            try { socket.disconnect(); } catch (e) { /* ignore */ }
        };
    }, [socket]);

}