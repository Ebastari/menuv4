import fs from 'fs';

let content = fs.readFileSync('App.tsx', 'utf8');

// Find the position of TopNavbar closing
const navbarEnd = content.indexOf('/>');
if (navbarEnd === -1) {
  console.log('Could not find TopNavbar closing');
  process.exit(1);
}

console.log('Found TopNavbar at position:', navbarEnd);

// Find any <div after the TopNavbar (look for the one with transition-opacity)
const nextDiv = content.indexOf('<div className=', navbarEnd);
if (nextDiv === -1) {
  console.log('Could not find next div');
  process.exit(1);
}

console.log('Found next div at position:', nextDiv);

const adminButton = `
      {/* Admin Login Button - Floating at top right, above weather forecast */}
      <div className="fixed top-20 right-4 z-30">
        {userRole !== 'admin' && (
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <i className="fas fa-user-shield"></i>
            <span className="hidden sm:inline">Admin Login</span>
            <span className="sm:hidden">Admin</span>
          </button>
        )}
      </div>
`;

// Insert admin button between TopNavbar and the next div
const newContent = content.slice(0, nextDiv) + adminButton + content.slice(nextDiv);

fs.writeFileSync('App.tsx', newContent);
console.log('App.tsx updated with admin button!');
