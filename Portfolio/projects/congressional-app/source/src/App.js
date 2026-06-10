import React, { useState, useEffect } from 'react';

const GolfApp = () => {
 const [page, setPage] = useState('main-menu');
 const [category, setCategory] = useState('');
 
 //profile stuff
 const [name, setName] = useState('');
 const [handicap, setHandicap] = useState('');
 const [favClub, setFavClub] = useState('');
 
 //club distances
 const [distances, setDistances] = useState({
 driver: '', '3-wood': '', '5-wood': '',
 '3-iron': '', '4-iron': '', '5-iron': '', '6-iron': '',
 '7-iron': '', '8-iron': '', '9-iron': '',
 'pitching-wedge': '', 'sand-wedge': '', 'lob-wedge': '', 'putter': ''
 });

 const [scorecard, setScorecard] = useState({});
 const [distance, setDistance] = useState('');
 const [suggestion, setSuggestion] = useState('');
 const [targetDist, setTargetDist] = useState('');

 //setup scorecard when app loads
 useEffect(() => {
 const card = {};
 for (let i = 1; i <= 18; i++) {
 card[i] = { par: 4, score: '' };
 }
 setScorecard(card);
 }, []);

 //all the club recommendations by category
 const recommendations = {
 "Driver & Distance": [
 { name: "TaylorMade Stealth 2 Driver", price: "$499", description: "Latest technology for maximum distance and forgiveness" },
 { name: "Callaway Rogue ST MAX Driver", price: "$449", description: "AI-designed face for optimal ball speed" },
 { name: "Ping G425 Driver", price: "$429", description: "Proven performance with excellent sound and feel" }
 ],
 "Iron Play": [
 { name: "Titleist T200 Irons", price: "$1,200", description: "Perfect blend of distance and precision" },
 { name: "Callaway Apex DCB Irons", price: "$1,100", description: "Deep cavity back for maximum forgiveness" },
 { name: "Ping i525 Irons", price: "$1,050", description: "Hollow body design for distance and stopping power" }
 ],
 "Short Game & Chipping": [
 { name: "Titleist Vokey SM9 Wedges", price: "$159 each", description: "Tour-proven spin and control" },
 { name: "Cleveland RTX 6 ZipCore Wedges", price: "$149 each", description: "Enhanced feel and spin around the greens" },
 { name: "TaylorMade MG3 Wedges", price: "$139 each", description: "Raw face technology for maximum spin" }
 ],
 "Putting": [
 { name: "Scotty Cameron Phantom X", price: "$429", description: "Precision milled for perfect roll" },
 { name: "Odyssey White Hot OG", price: "$199", description: "Legendary White Hot feel" },
 { name: "Ping PLD Milled Putters", price: "$349", description: "Tour-proven performance and feel" }
 ],
 "Course Management": [
 { name: "Golf GPS Watch", price: "$299", description: "Precise yardages to improve decision making" },
 { name: "Rangefinder with Slope", price: "$249", description: "Accurate distances for club selection" },
 { name: "Course Strategy Book", price: "$29", description: "Learn to think your way around the course" }
 ],
 "Fitness & Flexibility": [
 { name: "Golf Fitness Program", price: "$99", description: "Improve strength and flexibility for golf" },
 { name: "Golf Alignment Sticks", price: "$19", description: "Practice aid for proper setup and swing plane" },
 { name: "Golf Training Mat", price: "$149", description: "Practice at home year-round" }
 ]
 };

 const cats = [
 "Driver & Distance", "Iron Play", "Short Game & Chipping",
 "Putting", "Course Management", "Fitness & Flexibility"
 ];

 const changePage = (newPage) => {
 setPage(newPage);
 if (newPage !== 'buy-clubs') {
 setCategory('');
 }
 };

 const pickCategory = (cat) => {
 setCategory(cat);
 };

 const updateDistance = (club, value) => {
 setDistances({...distances, [club]: value});
 };

 const saveDistances = () => {
 const filled = Object.entries(distances).filter(([club, dist]) => dist !== '');
 if (filled.length > 0) {
 alert(`Saved!\n${filled.map(([club, dist]) => `${club}: ${dist} yards`).join('\n')}`);
 } else {
 alert('Please enter at least one distance');
 }
 };

 const saveProfile = () => {
 if (name && handicap && favClub) {
 alert(`Profile saved!\nName: ${name}\nHandicap: ${handicap}\nFavorite Club: ${favClub}`);
 } else {
 alert('Please fill in all fields');
 }
 };

 const getClubSuggestion = () => {
 if (!distance) {
 setSuggestion('Please enter distance to hole');
 return;
 }

 const dist = parseInt(distance);
 const clubArr = Object.entries(distances)
 .filter(([club, d]) => d !== '')
 .map(([club, d]) => ({ club, distance: parseInt(d) }))
 .sort((a, b) => Math.abs(dist - a.distance) - Math.abs(dist - b.distance));

 if (clubArr.length === 0) {
 setSuggestion('Please set your club distances first');
 return;
 }

 const best = clubArr[0];
 setSuggestion(`Recommended: ${best.club} (${best.distance} yards)`);
 };

 const calcHandicap = () => {
 const scores = Object.values(scorecard).map(hole => parseInt(hole.score) || 0).filter(s => s > 0);
 if (scores.length === 0) return 'No scores entered';
 
 const total = scores.reduce((sum, s) => sum + s, 0);
 const totalPar = Object.values(scorecard).slice(0, scores.length).reduce((sum, hole) => sum + hole.par, 0);
 const hcp = Math.max(0, total - totalPar);
 
 return `Current Handicap: ${hcp} (based on ${scores.length} holes)`;
 };

 const updateCard = (hole, field, value) => {
 setScorecard({
 ...scorecard,
 [hole]: {...scorecard[hole], [field]: value}
 });
 };

 const totalScore = () => {
 return Object.values(scorecard).reduce((total, hole) => {
 return total + (parseInt(hole.score) || 0);
 }, 0);
 };

 const totalPar = () => {
 return Object.values(scorecard).reduce((total, hole) => total + hole.par, 0);
 };

 //styles
 const bg = {
 fontFamily: 'Arial, sans-serif',
 margin: 0,
 padding: 0,
 backgroundImage: 'url(https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 minHeight: '100vh',
 color: 'white',
 textAlign: 'center',
 paddingTop: '50px'
 };

 const container = {
 maxWidth: '800px',
 margin: '0 auto',
 padding: '0 20px'
 };

 const bigTitle = {
 fontSize: '3rem',
 marginBottom: '40px',
 textShadow: '2px 2px 6px black'
 };

 const title = {
 fontSize: '2.5rem',
 marginBottom: '30px'
 };

 const btn = {
 padding: '12px',
 backgroundColor: 'rgba(0,128,0,0.8)',
 color: 'white',
 border: 'none',
 borderRadius: '10px',
 cursor: 'pointer',
 fontSize: '1rem',
 fontWeight: 'bold',
 textDecoration: 'none',
 display: 'block',
 transition: 'all 0.3s ease'
 };

 const backBtn = {
 ...btn,
 backgroundColor: 'darkred',
 marginTop: '20px'
 };

 const catBtn = {
 ...btn,
 padding: '15px',
 backgroundColor: 'rgba(0,128,0,0.8)'
 };

 const selectedCat = {
 ...catBtn,
 backgroundColor: 'darkgreen'
 };

 const card = {
 backgroundColor: 'rgba(255, 255, 255, 0.95)',
 padding: '20px',
 borderRadius: '12px',
 textAlign: 'left',
 boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
 };

 const input = {
 marginLeft: '10px',
 padding: '8px',
 borderRadius: '6px',
 border: 'none',
 fontSize: '1rem',
 width: '200px'
 };

 const textInput = {
 padding: '10px',
 borderRadius: '6px',
 border: '2px solid #ddd',
 fontSize: '1rem',
 textAlign: 'center'
 };

 const whiteCard = {
 backgroundColor: 'rgba(255, 255, 255, 0.95)',
 padding: '20px',
 borderRadius: '12px',
 boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
 color: '#333',
 marginBottom: '20px'
 };

 //Main Menu
 const MainMenu = () => (
 <div style={bg}>
 <h1 style={bigTitle}>Golf Guru</h1>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px', margin: '0 auto' }}>
 <button style={btn} onClick={() => changePage('buy-clubs')}>
 Buy Clubs and Improve Game
 </button>
 <button style={btn} onClick={() => changePage('club-distances')}>
 Club Distances
 </button>
 <button style={btn} onClick={() => changePage('distance-to-hole')}>
 Distance to Hole
 </button>
 <button style={btn} onClick={() => changePage('handicap')}>
 Handicap
 </button>
 <button style={btn} onClick={() => changePage('scorecard')}>
 Scorecard
 </button>
 <button style={btn} onClick={() => changePage('profile')}>
 Profile
 </button>
 </div>
 </div>
 );

 //Buy Clubs page
 const BuyClubs = () => (
 <div style={bg}>
 <div style={container}>
 <h1 style={title}>Buy Clubs and Improve Game</h1>
 <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
 Select an area of your game to get personalized club and training recommendations
 </p>

 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px' }}>
 {cats.map((cat) => (
 <button
 key={cat}
 style={category === cat ? selectedCat : catBtn}
 onClick={() => pickCategory(cat)}
 >
 {cat}
 </button>
 ))}
 </div>

 {category && (
 <div style={{ marginBottom: '30px' }}>
 <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
 Recommendations for {category}
 </h2>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
 {recommendations[category].map((item, i) => (
 <div key={i} style={card}>
 <h3 style={{ color: 'darkgreen', marginBottom: '10px', marginTop: 0 }}>
 {item.name}
 </h3>
 <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>
 {item.price}
 </div>
 <div style={{ color: '#333', lineHeight: '1.4', marginBottom: '10px' }}>
 {item.description}
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 <button style={backBtn} onClick={() => changePage('main-menu')}>
 Back to Main Menu
 </button>
 </div>
 </div>
 );

 //Club Distances page
 const ClubDistances = () => {
 const clubs = [
 { key: 'driver', name: 'Driver' }, { key: '3-wood', name: '3-Wood' },
 { key: '5-wood', name: '5-Wood' }, { key: '3-iron', name: '3-Iron' },
 { key: '4-iron', name: '4-Iron' }, { key: '5-iron', name: '5-Iron' },
 { key: '6-iron', name: '6-Iron' }, { key: '7-iron', name: '7-Iron' },
 { key: '8-iron', name: '8-Iron' }, { key: '9-iron', name: '9-Iron' },
 { key: 'pitching-wedge', name: 'Pitching Wedge' },
 { key: 'sand-wedge', name: 'Sand Wedge' },
 { key: 'lob-wedge', name: 'Lob Wedge' },
 { key: 'putter', name: 'Putter' }
 ];

 return (
 <div style={bg}>
 <div style={container}>
 <h1 style={title}>Club Distances</h1>
 <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
 Enter your average distance for each club (in yards)
 </p>

 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto 30px' }}>
 {clubs.map((club) => (
 <div key={club.key} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
 <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#333', fontWeight: 'bold' }}>
 <span style={{ marginBottom: '10px', fontSize: '1.1rem' }}>
 {club.name}
 </span>
 <input
 type="number"
 value={distances[club.key] || ''}
 onChange={(e) => updateDistance(club.key, e.target.value)}
 placeholder="Distance (yards)"
 style={{...textInput, width: '150px'}}
 />
 </label>
 </div>
 ))}
 </div>

 <button style={{ ...btn, backgroundColor: 'green', marginBottom: '20px' }} onClick={saveDistances}>
 Save Club Distances
 </button>

 <button style={backBtn} onClick={() => changePage('main-menu')}>
 Back to Main Menu
 </button>
 </div>
 </div>
 );
 };

 //Distance to Hole page
 const DistanceToHole = () => (
 <div style={bg}>
 <div style={container}>
 <h1 style={title}>Distance to Hole</h1>
 
 <div style={whiteCard}>
 <h3 style={{ marginTop: 0, color: 'darkgreen' }}>Club Recommendation</h3>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
 <input
 type="number"
 value={distance || ''}
 onChange={(e) => setDistance(e.target.value)}
 placeholder="Enter distance to hole (yards)"
 style={{...textInput, width: '250px'}}
 />
 <button style={{ ...btn, backgroundColor: 'green', width: 'fit-content', padding: '10px 20px' }} onClick={getClubSuggestion}>
 Get Club Recommendation
 </button>
 {suggestion && (
 <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px', fontWeight: 'bold', color: 'darkgreen', border: '2px solid #4caf50' }}>
 {suggestion}
 </div>
 )}
 </div>
 </div>

 <div style={whiteCard}>
 <h3 style={{ marginTop: 0, color: 'darkgreen' }}>Distance Calculator</h3>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
 <input
 type="number"
 value={targetDist || ''}
 onChange={(e) => setTargetDist(e.target.value)}
 placeholder="Target distance (yards)"
 style={{...textInput, width: '250px'}}
 />
 <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
 <strong>Available Clubs for {targetDist} yards:</strong>
 <div style={{ marginTop: '10px' }}>
 {targetDist && Object.entries(distances)
 .filter(([club, d]) => d !== '' && Math.abs(parseInt(d) - parseInt(targetDist)) <= 10)
 .map(([club, d]) => (
 <div key={club} style={{ padding: '5px 10px', margin: '5px', backgroundColor: '#f0f8f0', borderRadius: '5px', display: 'inline-block' }}>
 {club}: {d} yards
 </div>
 ))
 }
 </div>
 </div>
 </div>
 </div>

 <button style={backBtn} onClick={() => changePage('main-menu')}>
 Back to Main Menu
 </button>
 </div>
 </div>
 );

 //Handicap page
 const Handicap = () => (
 <div style={bg}>
 <div style={container}>
 <h1 style={title}>Handicap Tracker</h1>
 
 <div style={whiteCard}>
 <h3 style={{ marginTop: 0, color: 'darkgreen' }}>Current Handicap Status</h3>
 <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'darkgreen', padding: '20px', backgroundColor: '#f0f8f0', borderRadius: '8px', marginBottom: '20px' }}>
 {calcHandicap()}
 </div>
 
 <div style={{ fontSize: '1.1rem', lineHeight: '1.6', textAlign: 'left' }}>
 <h4 style={{ color: 'darkgreen' }}>Handicap Information:</h4>
 <ul style={{ paddingLeft: '20px' }}>
 <li>A handicap represents strokes over par</li>
 <li>Lower handicaps indicate better players</li>
 <li>Handicaps are calculated from your best recent rounds</li>
 <li>Enter scores in the scorecard to track your handicap</li>
 </ul>
 
 <h4 style={{ color: 'darkgreen', marginTop: '20px' }}>Your Profile Handicap:</h4>
 <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
 {handicap ? `${handicap}` : 'Not set - update in Profile'}
 </div>
 </div>
 </div>

 <button style={backBtn} onClick={() => changePage('main-menu')}>
 Back to Main Menu
 </button>
 </div>
 </div>
 );

 //Scorecard page
 const Scorecard = () => (
 <div style={bg}>
 <div style={container}>
 <h1 style={title}>Scorecard</h1>
 
 <div style={whiteCard}>
 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
 <h3 style={{ margin: 0, color: 'darkgreen' }}>18-Hole Scorecard</h3>
 <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
 Total: {totalScore()} | Par: {totalPar()}
 </div>
 </div>
 
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
 {Array.from({ length: 18 }, (_, i) => i + 1).map(hole => (
 <div key={hole} style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '2px solid #ddd' }}>
 <div style={{ fontWeight: 'bold', marginBottom: '10px', color: 'darkgreen' }}>
 Hole {hole}
 </div>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
 <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 Par:
 <select
 value={scorecard[hole]?.par || 4}
 onChange={(e) => updateCard(hole, 'par', parseInt(e.target.value))}
 style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
 >
 <option value={3}>3</option>
 <option value={4}>4</option>
 <option value={5}>5</option>
 </select>
 </label>
 <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 Score:
 <input
 type="number"
 value={scorecard[hole]?.score || ''}
 onChange={(e) => updateCard(hole, 'score', e.target.value)}
 style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd', width: '60px', textAlign: 'center' }}
 min="1"
 max="15"
 />
 </label>
 </div>
 </div>
 ))}
 </div>

 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', fontSize: '1.1rem', fontWeight: 'bold' }}>
 <div style={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '5px' }}>
 Total Score: {totalScore()}
 </div>
 <div style={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '5px' }}>
 Total Par: {totalPar()}
 </div>
 <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
 +/- Par: {totalScore() - totalPar() > 0 ? '+' : ''}{totalScore() - totalPar() || 0}
 </div>
 </div>
 </div>

 <button style={backBtn} onClick={() => changePage('main-menu')}>
 Back to Main Menu
 </button>
 </div>
 </div>
 );

 //Profile page
 const Profile = () => (
 <div style={bg}>
 <div style={container}>
 <h1 style={title}>Profile Setup</h1>
 
 <div style={whiteCard}>
 <h3 style={{ marginTop: 0, color: 'darkgreen' }}>Player Information</h3>
 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto' }}>
 <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 Name:
 <input
 type="text"
 value={name || ''}
 onChange={(e) => setName(e.target.value)}
 style={input}
 placeholder="Enter your name"
 />
 </label>
 <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 Handicap:
 <input
 type="number"
 value={handicap || ''}
 onChange={(e) => setHandicap(e.target.value)}
 style={input}
 placeholder="Enter handicap"
 />
 </label>
 <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 Favorite Club:
 <input
 type="text"
 value={favClub || ''}
 onChange={(e) => setFavClub(e.target.value)}
 style={input}
 placeholder="Enter favorite club"
 />
 </label>
 <button style={{ ...btn, backgroundColor: 'green' }} onClick={saveProfile}>
 Save Profile
 </button>
 </div>
 </div>

 {name && (
 <div style={whiteCard}>
 <h3 style={{ marginTop: 0, color: 'darkgreen' }}>Profile Summary</h3>
 <div style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.6' }}>
 <p><strong>Name:</strong> {name}</p>
 <p><strong>Handicap:</strong> {handicap || 'Not set'}</p>
 <p><strong>Favorite Club:</strong> {favClub || 'Not set'}</p>
 </div>
 </div>
 )}

 <button style={backBtn} onClick={() => changePage('main-menu')}>
 Back to Main Menu
 </button>
 </div>
 </div>
 );

 //figure out which page to show
 const renderPage = () => {
 if (page === 'main-menu') return <MainMenu />;
 if (page === 'buy-clubs') return <BuyClubs />;
 if (page === 'club-distances') return <ClubDistances />;
 if (page === 'distance-to-hole') return <DistanceToHole />;
 if (page === 'handicap') return <Handicap />;
 if (page === 'scorecard') return <Scorecard />;
 if (page === 'profile') return <Profile />;
 return <MainMenu />;
 };

 return <div>{renderPage()}</div>;
};

export default GolfApp;