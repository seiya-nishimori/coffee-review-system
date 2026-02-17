import { useEffect, useState } from 'react'

function App() {
    const [message, setMessage] = useState('Laravelに接続中...')

    useEffect(() => {
        // LaravelのURLを叩く
        fetch('http://localhost:9000/api/test')
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch((err) => {
                console.error(err);
                setMessage('Laravelに接続できませんでした...');
            })
    }, [])

    return (
        <div style={{
            height: '100vh', display: 'flex', justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#eef2f7', fontFamily: 'sans-serif'
        }}>
            <div style={{
                padding: '30px', background: 'white', borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center'
            }}>
                <h1 style={{ color: '#333', marginBottom: '10px' }}>環境構築テスト</h1>
                <div style={{
                    fontSize: '20px', fontWeight: 'bold',
                    color: message.includes('成功') ? '#2ecc71' : '#e74c3c'
                }}>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default App