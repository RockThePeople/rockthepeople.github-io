export function getPeerID() {
    var peerId = "";
    peerId = localStorage.getItem('peerId');
    if (!peerId) {
        peerId = [...crypto.getRandomValues(new Uint8Array(8))]
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        localStorage.setItem('peerId', peerId);
        console.log(peerId);
    }
    return peerId;
}