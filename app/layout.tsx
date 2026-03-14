import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gautier Fishing — Comptabilité",
  description: "Application de comptabilité Gautier Fishing",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{margin:0,padding:0,fontFamily:'Segoe UI,system-ui,sans-serif'}}>
        <style>{`
          .app-container { display: flex; height: 100vh; background: #f0f4f8; }
          .sidebar { width: 215px; background: #1a2535; display: flex; flex-direction: column; flex-shrink: 0; }
          .main-content { flex: 1; overflow-y: auto; }
          .mobile-nav { display: none; }
          .mobile-header { display: none; }
          @media (max-width: 768px) {
            .app-container { flex-direction: column; height: 100vh; }
            .sidebar { display: none; }
            .mobile-header { display: flex; background: #1a2535; padding: 12px 16px; align-items: center; justify-content: space-between; flex-shrink: 0; }
            .mobile-nav { display: flex; background: #fff; border-top: 0.5px solid #dde8f0; padding: 6px 0 10px; flex-shrink: 0; position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; }
            .main-content { flex: 1; overflow-y: auto; padding-bottom: 70px; }
            .mobile-photo-btn { display: flex !important; }
          }
          .mobile-photo-btn { display: none; }
          .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; text-decoration: none; padding: 4px 0; }
          .nav-icon { font-size: 20px; line-height: 1; }
          .nav-label { font-size: 9px; color: #9ab0c4; text-transform: uppercase; letter-spacing: .05em; }
          .nav-item.active .nav-label { color: #1a2535; font-weight: 600; }
          * { box-sizing: border-box; }
        `}</style>

        <div className="app-container">
          
          {/* SIDEBAR DESKTOP */}
          <div className="sidebar">
            <div style={{padding:'22px 18px 20px',borderBottom:'1px solid #2a3a50'}}>
              <div style={{display:'flex',alignItems:'center',gap:11}}>
                <div style={{width:40,height:40,background:'#2a4060',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3L5 9.5V20h5v-6h4v6h5V9.5L12 3z" fill="#a8d4f8"/></svg>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>
                    <span style={{color:'#cc2020'}}>G</span>autier <span style={{color:'#5a9be0'}}>F</span>ishing
                  </div>
                  <span style={{color:'#6a8aaa',fontSize:10,textTransform:'uppercase',letterSpacing:'.1em',marginTop:3,display:'block'}}>Comptabilité</span>
                </div>
              </div>
            </div>
            <div style={{padding:'10px 0',flex:1}}>
              <div style={{fontSize:10,color:'#4a6070',textTransform:'uppercase',letterSpacing:'.1em',padding:'12px 18px 4px'}}>Principal</div>
              <Link href="/" style={{textDecoration:'none',display:'block',padding:'10px 18px',fontSize:13,color:'#8dacc5'}}>Tableau de bord</Link>
              <Link href="/ventes" style={{textDecoration:'none',display:'block',padding:'10px 18px',fontSize:13,color:'#8dacc5'}}>Ventes</Link>
              <Link href="/depenses" style={{textDecoration:'none',display:'block',padding:'10px 18px',fontSize:13,color:'#8dacc5'}}>Dépenses</Link>
              <div style={{fontSize:10,color:'#4a6070',textTransform:'uppercase',letterSpacing:'.1em',padding:'12px 18px 4px'}}>Outils</div>
              <Link href="/facture" style={{textDecoration:'none',display:'block',padding:'10px 18px',fontSize:13,color:'#8dacc5'}}>Ajouter une facture</Link>
              <Link href="/exports" style={{textDecoration:'none',display:'block',padding:'10px 18px',fontSize:13,color:'#8dacc5'}}>Exports</Link>
              <div style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                À vérifier <span style={{background:'#c07a10',color:'#fff',fontSize:10,padding:'1px 7px',borderRadius:10}}>3</span>
              </div>
              <div style={{fontSize:10,color:'#4a6070',textTransform:'uppercase',letterSpacing:'.1em',padding:'12px 18px 4px'}}>Compte</div>
              <Link href="/parametres" style={{textDecoration:'none',display:'block',padding:'10px 18px',fontSize:13,color:'#8dacc5'}}>Paramètres</Link>
            </div>
            <div style={{padding:'14px 18px',borderTop:'1px solid #2a3a50',display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:32,height:32,borderRadius:'50%',background:'#2a5a8a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#fff',fontWeight:600}}>JG</div>
              <div>
                <div style={{fontSize:13,color:'#fff',fontWeight:500}}>Johan G.</div>
                <div style={{fontSize:10,color:'#6a8aaa'}}>Micro-entreprise</div>
              </div>
            </div>
          </div>

          {/* HEADER MOBILE */}
          <div className="mobile-header">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:32,height:32,background:'#2a4060',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L5 9.5V20h5v-6h4v6h5V9.5L12 3z" fill="#a8d4f8"/></svg>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:'#fff'}}><span style={{color:'#cc2020'}}>G</span>autier <span style={{color:'#5a9be0'}}>F</span>ishing</div>
                <div style={{fontSize:9,color:'#6a8aaa',textTransform:'uppercase',letterSpacing:'.1em'}}>Comptabilité</div>
              </div>
            </div>
            <div style={{width:32,height:32,borderRadius:'50%',background:'#2a5a8a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#fff',fontWeight:600}}>JG</div>
          </div>

          {/* BOUTON PHOTO MOBILE */}
          <div className="mobile-photo-btn" style={{padding:'12px 16px',background:'#f0f4f8',flexDirection:'column',gap:0}}>
            <Link href="/facture" style={{textDecoration:'none'}}>
              <div style={{background:'#1a2535',borderRadius:14,padding:'16px 20px',display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:48,height:48,background:'#2a4060',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a8d4f8" strokeWidth="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </div>
                <div>
                  <div style={{fontSize:15,fontWeight:600,color:'#fff'}}>📷 Photographier une facture</div>
                  <div style={{fontSize:12,color:'#7a9ab5',marginTop:2}}>Ouvre l'appareil photo</div>
                </div>
              </div>
            </Link>
          </div>

          {/* CONTENU */}
          <div className="main-content">
            {children}
          </div>

          {/* NAVIGATION MOBILE BAS */}
          <nav className="mobile-nav">
            <Link href="/" className="nav-item">
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Accueil</span>
            </Link>
            <Link href="/ventes" className="nav-item">
              <span className="nav-icon">🛒</span>
              <span className="nav-label">Ventes</span>
            </Link>
            <Link href="/depenses" className="nav-item">
              <span className="nav-icon">🧾</span>
              <span className="nav-label">Dépenses</span>
            </Link>
            <Link href="/facture" className="nav-item">
              <span className="nav-icon">📷</span>
              <span className="nav-label">Facture</span>
            </Link>
            <Link href="/exports" className="nav-item">
              <span className="nav-icon">📤</span>
              <span className="nav-label">Exports</span>
            </Link>
          </nav>

        </div>
      </body>
    </html>
  );
}