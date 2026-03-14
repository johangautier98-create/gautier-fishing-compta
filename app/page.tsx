import Link from "next/link";

export default function Home() {
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>

      {/* TOPBAR */}
      <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px 0'}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
          <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Tableau de bord</div>
          <button style={{background:'#1a2535',color:'#fff',border:'none',borderRadius:8,padding:'9px 18px',fontSize:13,cursor:'pointer',fontWeight:500}}>+ Ajouter une facture</button>
        </div>
        <div style={{display:'flex',gap:3,overflowX:'auto',alignItems:'flex-end'}}>
          {['Jan','Fév','Mars','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc','T1','T2','Annuel'].map((m,i)=>(
            <div key={m} style={{padding:'7px 11px',borderRadius:'6px 6px 0 0',fontSize:12,color:i===2?'#fff':'#7090a8',background:i===2?'#1a2535':i===12?'#2a4060':'transparent',cursor:'pointer',whiteSpace:'nowrap'}}>{m}</div>
          ))}
          <select style={{fontSize:12,color:'#5a7a95',border:'0.5px solid #c8d8e8',borderRadius:6,padding:'6px 10px',background:'#fff',marginLeft:6,marginBottom:2}}>
            <option>2025</option><option>2024</option><option>2023</option>
          </select>
        </div>
      </div>

      {/* BODY */}
      <div style={{padding:'24px 28px',overflowY:'auto',flex:1}}>
        
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:12,marginBottom:20}}>
          {[
            {label:'Chiffre d\'affaires',val:'8 240 €',sub:'47 commandes · mars',badge:'+12 %',up:true},
            {label:'Dépenses',val:'1 380 €',sub:'14 factures enregistrées',badge:'+3 %',up:false},
            {label:'Bénéfice estimé',val:'6 860 €',sub:'avant cotisations',badge:'+15 %',up:true},
            {label:'Seuil micro-entreprise',val:'32 %',sub:'24 720 € / 77 700 €',badge:null,up:true},
          ].map(k=>(
            <div key={k.label} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:16,textAlign:'center'}}>
              <div style={{fontSize:10,color:'#7090a8',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:8}}>{k.label}</div>
              <div style={{fontSize:22,fontWeight:500,color:'#1a2e40',whiteSpace:'nowrap'}}>{k.val}</div>
              <div style={{fontSize:11,color:'#9ab0c4',marginTop:4}}>{k.sub}</div>
              {k.badge && <span style={{fontSize:11,padding:'2px 9px',borderRadius:10,marginTop:7,display:'inline-block',background:k.up?'#e8f4e8':'#fce8e8',color:k.up?'#2a6a3a':'#8a2a2a'}}>{k.badge}</span>}
              {!k.badge && <div style={{height:4,background:'#e8eef4',borderRadius:2,marginTop:10,overflow:'hidden'}}><div style={{width:'32%',height:'100%',background:'#3d7aad',borderRadius:2}}/></div>}
            </div>
          ))}
        </div>

        <div style={{background:'#fef8e8',border:'0.5px solid #f0d468',borderRadius:10,padding:'11px 16px',fontSize:13,color:'#7a5c10',marginBottom:18,display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'#d4a010',flexShrink:0}}/>
          3 factures à vérifier — doublons ou fournisseurs non identifiés détectés automatiquement.
        </div>

        <div style={{display:'grid',gridTemplateColumns:'minmax(0,3fr) minmax(0,1fr)',gap:16}}>
          
          <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:20}}>
            <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:14,display:'flex',justifyContent:'space-between'}}>
              Dernières opérations <span style={{fontSize:12,color:'#3d7aad',textTransform:'none',fontWeight:400,cursor:'pointer'}}>Tout afficher →</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.8fr) 80px 55px 75px',gap:8,padding:'8px 0',borderBottom:'0.5px solid #f0f4f8'}}>
              {['Libellé','Source','Date','Montant'].map(h=><span key={h} style={{fontSize:11,color:'#b0c4d8',textTransform:'uppercase',letterSpacing:'.04em',textAlign:h==='Montant'?'right':'left'}}>{h}</span>)}
            </div>
            {[
              {nom:'Commande #8821',meta:'Marie D. — 2 articles',tag:'Shopify',tagC:'#e6f1fb',tagT:'#185FA5',date:'14/03',amt:'+127 €',pos:true},
              {nom:'Colissimo ×4',meta:'La Poste',tag:'Envois',tagC:'#fde8d8',tagT:'#7a3a1a',date:'13/03',amt:'−18 €',pos:false},
              {nom:'Encaissement PayPal',meta:'ref. PP-4421',tag:'PayPal',tagC:'#e1f5ee',tagT:'#0F6E56',date:'12/03',amt:'+89 €',pos:true},
              {nom:'Emballages carton',meta:'Amazon Pro',tag:'Emballage',tagC:'#fde8d8',tagT:'#7a3a1a',date:'11/03',amt:'−76 €',pos:false},
              {nom:'Meta Ads',meta:'Publicité',tag:'Pub',tagC:'#eeedfe',tagT:'#534AB7',date:'05/03',amt:'−150 €',pos:false},
              {nom:'Commande #8820',meta:'Pierre M. — 1 article',tag:'Shopify',tagC:'#e6f1fb',tagT:'#185FA5',date:'10/03',amt:'+54 €',pos:true},
            ].map(r=>(
              <div key={r.nom} style={{display:'grid',gridTemplateColumns:'minmax(0,1.8fr) 80px 55px 75px',gap:8,padding:'9px 0',borderBottom:'0.5px solid #f0f4f8',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:13,color:'#1a2e40',fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.nom}</div>
                  <div style={{fontSize:11,color:'#9ab0c4',marginTop:1}}>{r.meta}</div>
                </div>
                <span style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:r.tagC,color:r.tagT,display:'inline-block',whiteSpace:'nowrap'}}>{r.tag}</span>
                <span style={{fontSize:12,color:'#9ab0c4'}}>{r.date}</span>
                <span style={{fontSize:13,fontWeight:500,textAlign:'right',color:r.pos?'#2a6a3a':'#8a2a2a'}}>{r.amt}</span>
              </div>
            ))}
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:18}}>
              <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:10,textAlign:'center'}}>Cotisations URSSAF</div>
              <div style={{fontSize:26,fontWeight:500,color:'#1a2e40',textAlign:'center'}}>1 015 €</div>
              <div style={{fontSize:12,color:'#9ab0c4',textAlign:'center',marginTop:4}}>12,3 % du CA · micro-entreprise</div>
            </div>
            <div style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:18}}>
              <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:12}}>Dépenses par catégorie</div>
              {[['Emballage','420 €'],['Envois','310 €'],['Publicité','280 €'],['Logiciels','190 €'],['Divers','180 €']].map(([nom,amt])=>(
                <div key={nom} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'0.5px solid #f0f4f8'}}>
                  <span style={{fontSize:13,color:'#1a2e40'}}>{nom}</span>
                  <span style={{fontSize:13,fontWeight:500,color:'#1a2e40'}}>{amt}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}