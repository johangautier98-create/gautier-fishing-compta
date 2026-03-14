'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MOIS = ['Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc','T1','T2','T3','T4','Annuel']

const DATA: Record<string, any> = {
  'Jan':   {ca:'3 120 €', dep:'890 €',  ben:'2 230 €'},
  'Fév':   {ca:'5 840 €', dep:'1 100 €',ben:'4 740 €'},
  'Mars':  {ca:'8 240 €', dep:'1 380 €',ben:'6 860 €'},
  'Avr':   {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Mai':   {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Juin':  {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Juil':  {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Août':  {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Sep':   {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Oct':   {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Nov':   {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Déc':   {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'T1':    {ca:'17 200 €',dep:'3 370 €',ben:'13 830 €'},
  'T2':    {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'T3':    {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'T4':    {ca:'0 €',     dep:'0 €',    ben:'0 €'},
  'Annuel':{ca:'17 200 €',dep:'3 370 €',ben:'13 830 €'},
}

export default function Exports() {
  const router = useRouter()
  const [moisSel, setMoisSel] = useState('Mars')
  const [annee, setAnnee] = useState('2025')
  const [selection, setSelection] = useState('Récapitulatif mensuel')
  const d = DATA[moisSel] || DATA['Mars']

  const exportsList = [
    {nom:'Récapitulatif mensuel',sub:'CA, dépenses, bénéfice, cotisations',badge:'PDF',bc:'#fce8e8',bt:'#8a2a2a'},
    {nom:'Journal des ventes',sub:'Toutes commandes Shopify + PayPal',badge:'CSV',bc:'#e8f4e8',bt:'#2a6a3a'},
    {nom:'Journal des dépenses',sub:'Factures avec justificatifs liés',badge:'Excel',bc:'#e8f4e0',bt:'#1a6a20'},
    {nom:'Rapport expert-comptable',sub:'Format structuré, toutes catégories',badge:'PDF',bc:'#fce8e8',bt:'#8a2a2a'},
    {nom:'Export URSSAF — cotisations',sub:'CA trimestriel prêt à déclarer',badge:'CSV',bc:'#e8f4e8',bt:'#2a6a3a'},
  ]

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
            onClick={()=>router.push('/depenses')}
            style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}
          >
            Dépenses
          </div>

          <div style={{fontSize:10,color:'#4a6070',textTransform:'uppercase',letterSpacing:'.1em',padding:'12px 18px 4px'}}>Outils</div>

          <div style={{padding:'10px 18px',fontSize:13,color:'#8dacc5',cursor:'pointer'}}>Rapprochement</div>

          <div
            style={{padding:'10px 18px',fontSize:13,color:'#fff',background:'#1e2f3d',borderLeft:'3px solid #4a8fd5',cursor:'pointer'}}
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
      <div style={{flex:1,fontFamily:'Segoe UI,system-ui,sans-serif',background:'#f0f4f8',minHeight:'100vh'}}>
        <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px 0'}}>
          <div style={{fontSize:22,fontWeight:500,color:'#1a2e40',marginBottom:16}}>Exports</div>
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

        <div style={{padding:'24px 28px',maxWidth:700}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12,marginBottom:24}}>
            {[
              {label:'CA sélectionné',val:d.ca,sub:`${moisSel} ${annee}`},
              {label:'Dépenses',val:d.dep,sub:'14 factures'},
              {label:'Bénéfice estimé',val:d.ben,sub:'avant cotisations'},
            ].map(k=>(
              <div key={k.label} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
                <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>{k.label}</div>
                <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>{k.val}</div>
                <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>{k.sub}</div>
              </div>
            ))}
          </div>

          {exportsList.map(e=>(
            <div
              key={e.nom}
              onClick={()=>setSelection(e.nom)}
              style={{
                background:'#fff',
                border:'0.5px solid #dde8f0',
                borderRadius:12,
                padding:'14px 18px',
                marginBottom:10,
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                cursor:'pointer',
                boxShadow: selection===e.nom ? '0 0 0 2px #1a2535 inset' : 'none'
              }}
            >
              <div>
                <div style={{fontSize:14,fontWeight:500,color:'#1a2e40'}}>{e.nom}</div>
                <div style={{fontSize:12,color:'#8a9aaa',marginTop:3}}>{e.sub}</div>
              </div>
              <span style={{fontSize:11,padding:'3px 10px',borderRadius:6,background:e.bc,color:e.bt,fontWeight:500}}>{e.badge}</span>
            </div>
          ))}

          <button
            onClick={()=>alert(`Téléchargement simulé : ${selection} — ${moisSel} ${annee}`)}
            style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:12,padding:'15px',width:'100%',fontSize:15,fontWeight:500,cursor:'pointer',marginTop:8}}
          >
            Télécharger la sélection
          </button>
        </div>
      </div>
    </div>
  )
}