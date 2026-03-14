'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOIS = ['Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc','T1','T2','T3','T4','Annuel']

export default function Depenses() {
  const router = useRouter()
  const [moisSel, setMoisSel] = useState('Mars')
  const [annee, setAnnee] = useState('2025')
  const [filtre, setFiltre] = useState('Toutes')

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
            onClick={()=>router.push('/ventes')}
            style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}
          >
            Ventes
          </div>

          <div
            style={{padding:'10px 18px',fontSize:13,color:'#fff',background:'#1e2f3d',borderLeft:'3px solid #4a8fd5',cursor:'pointer'}}
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

      {/* CONTENU */}
      <div style={{flex:1,display:'flex',flexDirection:'column',minHeight:'100vh'}}>
        <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px 0'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
            <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Dépenses</div>
            <button
              onClick={()=>router.push('/facture')}
              style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:8,padding:'9px 18px',fontSize:13,cursor:'pointer',fontWeight:500}}
            >
              + Ajouter une facture
            </button>
          </div>

          <div style={{display:'flex',gap:3,overflowX:'auto',alignItems:'flex-end',paddingBottom:4}}>
            {MOIS.map((m)=>(
              <div
                key={m}
                onClick={()=>setMoisSel(m)}
                style={{
                  padding:'7px 11px',
                  borderRadius:'6px 6px 0 0',
                  fontSize:12,
                  color:moisSel===m?'#fff':'#7090a8',
                  background:moisSel===m?'#1a2535':'transparent',
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
              onChange={(e)=>setAnnee(e.target.value)}
              style={{fontSize:12,border:'0.5px solid #c8d8e8',borderRadius:6,padding:'6px 10px',background:'#fff',marginLeft:6,cursor:'pointer'}}
            >
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>

        <div style={{padding:'24px 28px',flex:1}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12,marginBottom:20}}>
            {[
              {label:'Total dépenses',val:'1 380 €',sub:`14 factures · ${moisSel.toLowerCase()} ${annee}`,badge:'+3 %',up:false},
              {label:'À valider',val:'3',sub:'pièces incomplètes',badge:'Attention',warn:true},
              {label:'Catégorie principale',val:'Emballage',sub:'420 € ce mois'},
            ].map(k=>(
              <div key={k.label} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
                <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>{k.label}</div>
                <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>{k.val}</div>
                <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>{k.sub}</div>
                {k.badge && <span style={{fontSize:11,padding:'2px 9px',borderRadius:10,marginTop:7,display:'inline-block',background:k.warn?'#fef4e0':k.up?'#e8f4e8':'#fce8e8',color:k.warn?'#7a5c10':k.up?'#2a6a3a':'#8a2a2a'}}>{k.badge}</span>}
              </div>
            ))}
          </div>

          <div style={{background:'#fef8e8',border:'0.5px solid #f0d468',borderRadius:10,padding:'11px 16px',fontSize:13,color:'#7a5c10',marginBottom:18,display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'#d4a010'}}/>
            3 factures à vérifier — fournisseur non reconnu ou montant suspect.
          </div>

          <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
            {['Toutes','Emballage','Envois','Publicité','Logiciels','Divers'].map((f)=>(
              <button
                key={f}
                onClick={()=>setFiltre(f)}
                style={{
                  background:filtre===f?'#1a2535':'#fff',
                  color:filtre===f?'#fff':'#5a7a95',
                  border:'0.5px solid #c8d8e8',
                  borderRadius:20,
                  padding:'5px 14px',
                  fontSize:12,
                  cursor:'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:20}}>
            <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:14,display:'flex',justifyContent:'space-between'}}>
              Factures enregistrées — {moisSel} {annee}
              <span
                onClick={()=>router.push('/exports')}
                style={{fontSize:12,color:'#3d7aad',textTransform:'none',fontWeight:400,cursor:'pointer'}}
              >
                Exporter Excel →
              </span>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.6fr) 90px 60px 90px 80px',gap:8,padding:'8px 0',borderBottom:'0.5px solid #f0f4f8'}}>
              {['Fournisseur','Catégorie','Date','Montant TTC','Justificatif'].map(h=>(
                <span key={h} style={{fontSize:11,color:'#b0c4d8',textTransform:'uppercase',letterSpacing:'.04em'}}>{h}</span>
              ))}
            </div>

            {[
              {nom:'Amazon Pro',meta:'Emballages carton ×50',tag:'Emballage',tagC:'#e6f1fb',tagT:'#185FA5',date:'11/03',amt:'−76 €',ok:true},
              {nom:'La Poste',meta:'Colissimo ×4',tag:'Envois',tagC:'#e1f5ee',tagT:'#0F6E56',date:'13/03',amt:'−18 €',ok:true},
              {nom:'Meta Ads',meta:'Campagne mars',tag:'Publicité',tagC:'#eeedfe',tagT:'#534AB7',date:'05/03',amt:'−150 €',ok:true},
              {nom:'Shopify',meta:'Abonnement mensuel',tag:'Logiciel',tagC:'#f4f0fa',tagT:'#4a3a7a',date:'01/03',amt:'−29 €',ok:true},
              {nom:'Fournisseur inconnu',meta:'Non identifié',tag:'À vérifier',tagC:'#fef4e0',tagT:'#7a5c10',date:'07/03',amt:'−43 €',ok:false},
            ]
            .filter(r => filtre === 'Toutes' || r.tag === filtre)
            .map(r=>(
              <div key={r.nom} style={{display:'grid',gridTemplateColumns:'minmax(0,1.6fr) 90px 60px 90px 80px',gap:8,padding:'9px 0',borderBottom:'0.5px solid #f0f4f8',alignItems:'center',background:r.ok?'transparent':'#fefcf4',borderRadius:r.ok?0:8}}>
                <div>
                  <div style={{fontSize:13,color:'#1a2e40',fontWeight:500}}>{r.nom}</div>
                  <div style={{fontSize:11,color:'#9ab0c4'}}>{r.meta}</div>
                </div>
                <span style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:r.tagC,color:r.tagT,display:'inline-block'}}>{r.tag}</span>
                <span style={{fontSize:12,color:'#9ab0c4'}}>{r.date}</span>
                <span style={{fontSize:13,fontWeight:500,color:'#8a2a2a'}}>{r.amt}</span>
                <span
                  onClick={()=>router.push(r.ok ? '/facture' : '/a-verifier')}
                  style={{fontSize:11,color:r.ok?'#3d7aad':'#c07a10',cursor:'pointer'}}
                >
                  {r.ok?'Voir PDF':'Corriger'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}