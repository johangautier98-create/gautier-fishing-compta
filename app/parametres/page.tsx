export default function Parametres() {
  return (
    <div style={{flex:1,fontFamily:'Segoe UI,system-ui,sans-serif',background:'#f0f4f8',minHeight:'100vh'}}>
      <div style={{background:'#fff',borderBottom:'2px solid #dde8f0',padding:'20px 28px',marginBottom:24}}>
        <div style={{fontSize:22,fontWeight:500,color:'#1a2e40'}}>Paramètres</div>
      </div>
      <div style={{padding:'0 28px',maxWidth:600}}>
        {[
          {titre:'Mon profil',rows:[
            {label:'Johan Gautier',sub:'Gautier Fishing — auto-entrepreneur',right:<span style={{fontSize:12,color:'#3d7aad',cursor:'pointer'}}>Modifier</span>},
          ]},
          {titre:'Mode fiscal',rows:[
            {label:'Régime actuel',sub:'Micro-entreprise — sans TVA',right:<span style={{fontSize:11,padding:'3px 10px',borderRadius:6,background:'#e6f1fb',color:'#185FA5'}}>Micro-EI</span>},
            {label:'Taux de cotisation',sub:'Vente de marchandises',right:<span style={{fontSize:13,fontWeight:500,color:'#1a2e40'}}>12,3 %</span>},
          ]},
          {titre:'Synchronisations',rows:[
            {label:'Shopify',sub:'Import auto chaque nuit à 2h00',right:<span style={{fontSize:11,color:'#2a6a3a'}}>● Actif</span>},
            {label:'PayPal',sub:'Import automatique',right:<span style={{fontSize:11,color:'#2a6a3a'}}>● Actif</span>},
          ]},
          {titre:'Automatisations',rows:[
            {label:'Analyse IA des factures',sub:'Détection auto fournisseur, montant, date',right:null},
            {label:'Alertes anomalies',sub:'Doublons, montants suspects',right:null},
            {label:'Rapport mensuel auto',sub:'Envoyé par email le 1er du mois',right:null},
          ]},
        ].map(section=>(
          <div key={section.titre} style={{background:'#fff',border:'0.5px solid #dde8f0',borderRadius:12,padding:20,marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:500,color:'#4a6a85',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:14,paddingBottom:8,borderBottom:'0.5px solid #f0f4f8'}}>{section.titre}</div>
            {section.rows.map((row,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'0.5px solid #f8f8fc'}}>
                <div>
                  <div style={{fontSize:13,color:'#1a2e40',fontWeight:500}}>{row.label}</div>
                  <div style={{fontSize:11,color:'#8a9aaa',marginTop:2}}>{row.sub}</div>
                </div>
                {row.right || <div style={{width:38,height:22,background:'#1a2535',borderRadius:11,position:'relative',cursor:'pointer'}}><div style={{position:'absolute',width:16,height:16,background:'#fff',borderRadius:'50%',top:3,right:3}}/></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}