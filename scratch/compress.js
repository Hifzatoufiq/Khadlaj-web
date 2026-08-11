const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { spawn } = require('child_process');
const input = 'c:\\web\\assets\\videos\\Copy of Approved Shiyaaka sky v2.mp4';
const output = 'c:\\web\\assets\\videos\\shiyaaka-sky-approved-compressed.mp4';

console.log('Using ffmpeg at:', ffmpegPath);
console.log('Compressing video...');

const args = [
  '-i', input,
  '-vcodec', 'libx264',
  '-crf', '24', // 24 gives high quality but reduces size significantly
  '-preset', 'fast',
  '-movflags', 'faststart', // optimizes for web streaming
  '-y',
  output
];

const proc = spawn(ffmpegPath, args);
proc.stdout.on('data', (data) => process.stdout.write(data));
proc.stderr.on('data', (data) => process.stderr.write(data));
proc.on('close', (code) => {
  console.log('Compression finished with code', code);
});
