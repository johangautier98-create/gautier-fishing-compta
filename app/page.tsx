'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOIS = ['Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc','T1','T2','T3','T4','Annuel']

export default function VentesPage() {
  const router = useRouter()
  const [moisSel, setMoisSel] = useState('Mars')
  const [annee, setAnnee] = useState('2025')

  return (
    <div style={{display:'flex',height:'100vh',fontFamily:'Segoe UI,system-ui,sans-serif',background:'#f0f4f8'}}>
      
      {/* SIDEBAR */}
      <div style={{width:215,background:'#1a2535',display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'22px 18px 20px',borderBottom:'1px solid #2a3a50'}}>
          <div style={{display:'flex',alignItems:'center',gap:11}}>
            <div style={{width:40,height:40,background:'#2a4060',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L5 9.5V20h5v-6h4v6h5V9.5L12 3z" fill="#a8d4f8"/>
              </svg>
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>
                <span style={{color:'#cc2020'}}>G</span>autier <span style={{color:'#5a9be0'}}>F</span>ishing
              </div>
              <span style={{color:'#6a8aaa',fontSize:10,textTransform:'uppercase',letterSpacing:'.1em',marginTop:3,display:'block'}}>
                Comptabilité
              </span>
            </div>
          </div>
        </div>

        <div style={{padding:'10px 0',flex:1}}>
          <div style={{fontSize:10,color:'#4a6070',textTransform:'uppercase',letterSpacing:'.1em',padding:'12px 18px 4px'}}>Principal</div>

          <div
            onClick={()=>router.push('/')}
            style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}
          >
            Tableau de bord
          </div>

          <div
            style={{padding:'10px 18px',fontSize:13,color:'#fff',background:'#1e2f3d',borderLeft:'3px solid #4a8fd5',cursor:'pointer'}}
          >
            Ventes
          </div>

          <div
            onClick={()=>router.push('/depenses')}
            style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}
          >
            Dépenses
          </div>

          <div style={{fontSize:10,color:'#4a6070',textTransform:'uppercase',letterSpacing:'.1em',padding:'12px 18px 4px'}}>Outils</div>

          <div style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}>Rapprochement</div>

          <div
            onClick={()=>router.push('/exports')}
            style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}
          >
            Exports
          </div>

          <div
            onClick={()=>router.push('/a-verifier')}
            style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}
          >
            À vérifier <span style={{background:'#c07a10',color:'#fff',fontSize:10,padding:'1px 7px',borderRadius:10}}>3</span>
          </div>

          <div style={{fontSize:10,color:'#4a6070',textTransform:'uppercase',letterSpacing:'.1em',padding:'12px 18px 4px'}}>Compte</div>

          <div
            onClick={()=>router.push('/parametres')}
            style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}
          >
            Paramètres
          </div>
        </div>

        <div style={{padding:'14px 18px',borderTop:'1px solid #2a3a50',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:'#2a5a8a',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#fff',fontWeight:600}}>
            JG
          </div>
          <div>
            <div style={{fontSize:13,color:'#fff',fontWeight:500}}>Johan G.</div>
            <div style={{fontSize:10,color:'#6a8aaa'}}>Micro-entreprise</div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0}}>
        <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px 0'}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
            <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Ventes</div>

            <button
              onClick={()=>router.push('/facture')}
              style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:8,padding:'9px 18px',fontSize:13,cursor:'pointer',fontWeight:500}}
            >
              + Ajouter une facture
            </button>
          </div>

          <div style={{display:'flex',gap:3,overflowX:'auto',alignItems:'flex-end',paddingBottom:4}}>
            {MOIS.map(m=>(
              <div
                key={m}
                onClick={()=>setMoisSel(m)}
                style={{
                  padding:'7px 11px',
                  borderRadius:'6px 6px 0 0',
                  fontSize:12,
                  color: moisSel===m ? '#fff' : '#7090a8',
                  background: moisSel===m ? '#1a2535' : 'transparent',
                  cursor:'pointer',
                  whiteSpace:'nowrap',
                  fontWeight: moisSel===m ? 500 : 400
                }}
              >
                {m}
              </div>
            ))}

            <select
              value={annee}
              onChange={e=>setAnnee(e.target.value)}
              style={{fontSize:12,color:'#5a7a95',border:'0.5px solid #c8d8e8',borderRadius:6,padding:'6px 10px',background:'#fff',marginLeft:6,marginBottom:2,cursor:'pointer'}}
            >
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>

        <div style={{padding:'24px 28px',overflowY:'auto',flex:1}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:12,marginBottom:20}}>
            <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
              <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Total ventes</div>
              <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>8 240 €</div>
              <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>{moisSel} {annee}</div>
            </div>

            <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
              <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Commandes</div>
              <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>47</div>
              <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>Shopify + PayPal</div>
            </div>

            <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
              <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Panier moyen</div>
              <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>175 €</div>
              <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>estimation</div>
            </div>

            <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
              <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>Canal principal</div>
              <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Shopify</div>
              <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>ce mois</div>
            </div>
          </div>

          <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:20}}>
            <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:14}}>
              Journal des ventes
            </div>

            <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.8fr) 90px 70px 90px',gap:8,padding:'8px 0',borderBottom:'0.5px solid #f0f4f8'}}>
              {['Libellé','Source','Date','Montant'].map(h=>(
                <span key={h} style={{fontSize:11,color:'#b0c4d8',textTransform:'uppercase',letterSpacing:'.04em',textAlign:h==='Montant'?'right':'left'}}>{h}</span>
              ))}
            </div>

            {[
              {nom:'Commande #8821',meta:'Marie D. — 2 articles',tag:'Shopify',tagC:'#e6f1fb',tagT:'#185FA5',date:'14/03',amt:'+127 €'},
              {nom:'Encaissement PayPal',meta:'ref. PP-4421',tag:'PayPal',tagC:'#e1f5ee',tagT:'#0F6E56',date:'12/03',amt:'+89 €'},
              {nom:'Commande #8820',meta:'Pierre M. — 1 article',tag:'Shopify',tagC:'#e6f1fb',tagT:'#185FA5',date:'10/03',amt:'+54 €'},
            ].map(r=>(
              <div key={r.nom} style={{display:'grid',gridTemplateColumns:'minmax(0,1.8fr) 90px 70px 90px',gap:8,padding:'10px 0',borderBottom:'0.5px solid #f0f4f8',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:13,color:'#1a2e40',fontWeight:500}}>{r.nom}</div>
                  <div style={{fontSize:11,color:'#9ab0c4',marginTop:1}}>{r.meta}</div>
                </div>
                <span style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:r.tagC,color:r.tagT,display:'inline-block',whiteSpace:'nowrap'}}>{r.tag}</span>
                <span style={{fontSize:12,color:'#9ab0c4'}}>{r.date}</span>
                <span style={{fontSize:13,fontWeight:500,textAlign:'right',color:'#2a6a3a'}}>{r.amt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}