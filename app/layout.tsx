import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gautier Fishing — Comptabilité",
  description: "Application de comptabilité Gautier Fishing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{margin:0,padding:0,fontFamily:'Segoe UI,system-ui,sans-serif'}}>
        <div style={{display:'flex',height:'100vh',background:'#f0f4f8'}}>
          
          <div style={{width:215,background:'#1a2535',display:'flex',flexDirection:'column',flexShrink:0}}>
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

          <div style={{flex:1,overflowY:'auto'}}>
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}