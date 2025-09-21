'use client';

import { useState, useEffect } from 'react';
import { FaLock, FaUnlock, FaEye, FaEyeSlash, FaClipboard, FaMagic, FaCheckCircle, FaBolt } from 'react-icons/fa';
import { BiShield } from 'react-icons/bi';

export default function Home() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [barWidth, setBarWidth] = useState('0%');
  const [timeToCrack, setTimeToCrack] = useState('');
  const [matrixCols, setMatrixCols] = useState<string[][]>([]);

  // Generate columns for Matrix effect
  useEffect(() => {
    const cols = [];
    const charset = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()");
    const numCols = Math.floor(window.innerWidth / 16);
    for (let i = 0; i < numCols; i++) {
      const colLength = 20 + Math.floor(Math.random() * 20);
      const col = Array.from({ length: colLength }, () => charset[Math.floor(Math.random() * charset.length)]);
      cols.push(col);
    }
    setMatrixCols(cols);
  }, []);

  useEffect(() => {
    if (strength === 'Weak') setBarWidth('33%');
    else if (strength === 'Medium') setBarWidth('66%');
    else if (strength === 'Strong') setBarWidth('100%');
    else setBarWidth('0%');
  }, [strength]);

  const checkStrength = (pwd: string) => {
    if (pwd.length < 6) return 'Weak';
    if (pwd.length >= 6 && /[A-Za-z]/.test(pwd) && /[0-9]/.test(pwd)) return 'Medium';
    if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) return 'Strong';
    return 'Weak';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const strengthVal = checkStrength(value);
    setStrength(strengthVal);
    setTimeToCrack(estimateCrackTime(value));
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const newPwd = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setPassword(newPwd);
    const strengthVal = checkStrength(newPwd);
    setStrength(strengthVal);
    setTimeToCrack(estimateCrackTime(newPwd));
  };

  const requirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Number", valid: /[0-9]/.test(password) },
    { label: "Special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const estimateCrackTime = (pwd: string) => {
    const charsetSize = 26 + 26 + 10 + 32;
    const combinations = Math.pow(charsetSize, pwd.length);
    const guessesPerSecond = 1e9;
    const seconds = combinations / guessesPerSecond;

    if (seconds < 60) return `${Math.floor(seconds)} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`;
    return `${Math.floor(seconds / 31536000)} years`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 p-6 text-[#39FF14] font-mono min-h-screen">
      {/* Matrix background */}
      {matrixCols.map((col, idx) => {
        const duration = 5 + Math.random() * 5;
        return (
          <div
            key={idx}
            className="matrix-column"
            style={{
              left: idx * 16 + 'px',
              animationDuration: `${duration}s`,
            }}
          >
            {col.map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </div>
        );
      })}

      {/* Heading */}
      <h1 className="flex items-center gap-2 text-5xl font-bold drop-shadow-[0_0_10px_#39FF14]">
        <BiShield className="text-5xl drop-shadow-[0_0_10px_#39FF14]" />
        Password Strength Checker
      </h1>

      {/* Input */}
      <div className="relative w-80 flex justify-center">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full text-lg"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/4"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Strength bar */}
      {password && (
        <div className="w-80 mt-2">
          <div className="w-full h-3 bg-gray-800 rounded">
            <div
              style={{ width: barWidth, transition: 'width 0.5s ease-in-out' }}
              className={`h-3 rounded ${
                strength === 'Weak'
                  ? 'bg-red-500 drop-shadow-[0_0_10px_red]'
                  : strength === 'Medium'
                  ? 'bg-yellow-400 drop-shadow-[0_0_10px_yellow]'
                  : 'bg-[#39FF14] drop-shadow-[0_0_10px_#39FF14]'
              }`}
            ></div>
          </div>
          <p className="mt-1 font-semibold flex items-center gap-2">
            {strength === 'Weak' ? <FaUnlock className="text-red-500" /> : <FaLock className="text-[#39FF14]" />}
            Strength: {strength}
          </p>
        </div>
      )}

      {/* Checklist */}
      <ul className="text-sm mt-2 space-y-1 w-80">
        {requirements.map((req, idx) => (
          <li key={idx} className={`flex items-center gap-2 ${req.valid ? 'text-[#39FF14]' : 'text-red-500'}`}>
            {req.valid ? <FaCheckCircle /> : <FaBolt />}
            {req.label}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button onClick={() => navigator.clipboard.writeText(password)}> <FaClipboard /> Copy Password </button>
        <button onClick={generatePassword}> <FaMagic /> Generate Password </button>
      </div>

      {/* Time to crack */}
      {password && (
        <p className="mt-2 text-lg text-[#FF00FF]">
          Estimated time to crack: <span className="font-bold">{timeToCrack}</span>
        </p>
      )}
    </div>
  );
}
