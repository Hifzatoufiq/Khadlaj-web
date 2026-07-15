import re

with open('khadlaj-perfumes (1).jsx', 'r', encoding='utf-8') as f:
    code = f.read()

match = re.search(r'(function SignupPage\(\)\{.*?\n\})\n+function CartPage', code, re.DOTALL)
if not match:
    print('Failed to find SignupPage block.')
    exit(1)

old_signup_page = match.group(1)

new_signup_page = '''function FloatingInput({ label, type, value, onChange }) {
  const [focus, setFocus] = React.useState(false);
  const active = focus || value.length > 0;
  return (
    <div style={{position:"relative", marginBottom:24}}>
      <label style={{position:"absolute", left:16, top:active ? 8 : 18, fontSize:active ? 9 : 13, color:active ? "#B8922A" : "#999", letterSpacing:active?2:0, textTransform:active?"uppercase":"none", transition:"all 0.25s ease", pointerEvents:"none", fontFamily:"'Montserrat',sans-serif", fontWeight:active?700:400}}>
        {label}
      </label>
      <input
        type={type} value={value} onChange={onChange}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{width:"100%", background:"#FAF8F4", border:"1px solid", borderColor:active ? "#B8922A" : "#E8E0D2", color:"#111", padding:"24px 16px 8px", fontSize:15, outline:"none", fontFamily:"'Montserrat',sans-serif", transition:"border-color 0.3s ease"}}
      />
    </div>
  );
}

function SignupPage(){
  const [mode, setMode] = useState("login");
  const [done, setDone] = useState("");
  const [signupForm, setSignupForm] = useState({name:"",email:"",phone:"",password:""});
  const [loginForm, setLoginForm] = useState({email:"",password:""});
  const [forgotEmail, setForgotEmail] = useState("");
  const submit = (type) => {
    setDone(type);
    if(type==="signup") setSignupForm({name:"",email:"",phone:"",password:""});
    if(type==="login") setLoginForm({email:"",password:""});
    if(type==="forgot") setForgotEmail("");
  };
  const title = mode==="forgot" ? "Reset Password" : mode==="login" ? "Welcome Back" : "Create your account";
  const subtitle = mode==="forgot"
    ? "Enter your email and we will send password reset instructions."
    : mode==="login"
      ? "Login to manage your Khadlaj profile, wishlist, and private offers."
      : "Join for launch previews, fragrance stories, and private offers.";

  return (
    <div style={{background:"linear-gradient(180deg,#fff 0%,#FAF8F4 100%)"}}>
      <section style={{padding:"74px 5% 96px"}}>
        <div style={{maxWidth:1420,margin:"0 auto",display:"grid",gridTemplateColumns:".95fr 1.05fr",alignItems:"stretch",border:"1px solid #E8E0D2",boxShadow:"0 40px 100px rgba(0,0,0,.06)",background:"#fff"}} className="hero-split">
          <div className="auth-visual-panel" style={{position:"relative",overflow:"hidden",minHeight:680,background:"url('./assets/images/banners/spring-banner.png') center/cover",padding:"58px 52px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg, rgba(60,17,82,0.85) 0%, rgba(10,10,10,0.95) 100%)"}}/>
            <div style={{position:"absolute",top:-110,right:-90,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(184,146,42,.28),rgba(184,146,42,0) 68%)",zIndex:1}}/>
            <div style={{position:"relative",zIndex:2,maxWidth:470,marginTop:"auto",marginBottom:"auto"}}>
              <div style={{width:42,height:1,background:"#B8922A",marginBottom:22}}/>
              <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:18}}>Khadlaj Circle</p>
              <h1 className="disp" style={{fontSize:"clamp(48px,6vw,84px)",fontWeight:300,lineHeight:.98,color:"#fff",marginBottom:24,letterSpacing:"-1px"}}>{mode==="login" ? "Login" : mode==="forgot" ? "Reset Password" : "Sign Up"}</h1>
              <p style={{fontSize:15,color:"rgba(255,255,255,.75)",lineHeight:1.9,maxWidth:430,fontFamily:"'Montserrat',sans-serif",fontWeight:300}}>
                {mode==="login" ? "Welcome back! Login to manage your Khadlaj profile, wishlist, and exclusive offers." : mode==="forgot" ? "Enter your email and we will send you password reset instructions." : "Join Khadlaj Circle for new launch previews, fragrance stories, and private exclusive offers."}
              </p>
            </div>
          </div>

          <div style={{padding:"52px",background:"#fff",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            {done ? (
              <div style={{textAlign:"center",padding:"52px 0",animation:"fadeIn .5s ease"}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"#3c1152",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",color:"#fff",fontSize:13,letterSpacing:2,fontFamily:"'Montserrat',sans-serif",fontWeight:800,boxShadow:"0 12px 24px rgba(60,17,82,.2)"}}>OK</div>
                <h2 className="disp" style={{fontSize:42,color:"#111",fontWeight:300,marginBottom:12}}>{done==="forgot" ? "Check Your Email" : done==="login" ? "Welcome Back" : "You're In"}</h2>
                <p style={{color:"#777",fontSize:14,lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>
                  {done==="forgot" ? "Password reset instructions have been prepared for your email." : done==="login" ? "You are ready to continue your Khadlaj experience." : "Thank you for joining the Khadlaj Circle."}
                </p>
                <button className="btn-ghost" onClick={()=>setDone("")} style={{marginTop:32,padding:"16px 32px",borderColor:"#3c1152",color:"#3c1152"}}>Continue</button>
              </div>
            ) : (
              <div style={{position:"relative",zIndex:1,animation:"fadeIn .4s ease"}}>
                <div style={{display:mode==="forgot"?"none":"flex",gap:32,borderBottom:"1px solid #E8E0D2",marginBottom:42}}>
                  {["login","signup"].map(tab=>(
                    <button key={tab} onClick={()=>setMode(tab)} style={{border:"none",background:"transparent",color:mode===tab?"#3c1152":"#999",padding:"0 0 16px",fontSize:11,letterSpacing:2.4,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:800,cursor:"pointer",position:"relative",transition:"color .3s ease"}}>
                      {tab==="login" ? "Login" : "Sign Up"}
                      {mode===tab && <span style={{position:"absolute",bottom:-1,left:0,right:0,height:2,background:"#3c1152",animation:"slideIn .3s ease"}}/>}
                    </button>
                  ))}
                </div>
                {mode==="forgot" && <div style={{width:42,height:1,background:"#B8922A",marginBottom:22}}/>}
                
                <h2 className="disp" style={{fontSize:"clamp(32px,3.7vw,54px)",fontWeight:300,lineHeight:1.05,color:"#111",marginBottom:14}}>{title}</h2>
                <p style={{fontSize:14,color:"#777",lineHeight:1.8,fontFamily:"'Montserrat',sans-serif",marginBottom:36,maxWidth:520}}>{subtitle}</p>

                {mode==="signup" && (
                  <div style={{animation:"fadeIn .4s ease"}}>
                    <FloatingInput label="Full Name" type="text" value={signupForm.name} onChange={e=>setSignupForm({...signupForm,name:e.target.value})} />
                    <FloatingInput label="Email Address" type="email" value={signupForm.email} onChange={e=>setSignupForm({...signupForm,email:e.target.value})} />
                    <FloatingInput label="Phone Number" type="tel" value={signupForm.phone} onChange={e=>setSignupForm({...signupForm,phone:e.target.value})} />
                    <FloatingInput label="Password" type="password" value={signupForm.password} onChange={e=>setSignupForm({...signupForm,password:e.target.value})} />
                    <button onClick={()=>submit("signup")} style={{width:"100%",background:"#3c1152",color:"#fff",border:"none",padding:"20px",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:800,marginTop:12,boxShadow:"0 12px 24px rgba(60,17,82,.15)",transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Create Account</button>
                  </div>
                )}

                {mode==="login" && (
                  <div style={{animation:"fadeIn .4s ease"}}>
                    <FloatingInput label="Email Address" type="email" value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})} />
                    <FloatingInput label="Password" type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} />
                    
                    <div style={{display:"flex",justifyContent:"flex-end",margin:"-12px 0 24px"}}>
                      <button onClick={()=>setMode("forgot")} style={{background:"transparent",border:"none",color:"#B8922A",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",fontWeight:800,cursor:"pointer",transition:"color .3s ease"}} onMouseEnter={e=>e.currentTarget.style.color="#3c1152"} onMouseLeave={e=>e.currentTarget.style.color="#B8922A"}>Forgot Password?</button>
                    </div>
                    <button onClick={()=>submit("login")} style={{width:"100%",background:"#3c1152",color:"#fff",border:"none",padding:"20px",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:800,boxShadow:"0 12px 24px rgba(60,17,82,.15)",transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Login</button>
                  </div>
                )}

                {mode==="forgot" && (
                  <div style={{animation:"fadeIn .4s ease"}}>
                    <FloatingInput label="Email Address" type="email" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} />
                    <button onClick={()=>submit("forgot")} style={{width:"100%",background:"#3c1152",color:"#fff",border:"none",padding:"20px",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:800,boxShadow:"0 12px 24px rgba(60,17,82,.15)",transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>Send Reset Link</button>
                    <button onClick={()=>setMode("login")} style={{width:"100%",background:"transparent",color:"#3c1152",border:"1px solid #3c1152",padding:"18px",fontSize:11,letterSpacing:2.6,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:800,marginTop:16,transition:"all .3s ease"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(60,17,82,.04)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Back to Login</button>
                  </div>
                )}

                <p style={{fontSize:11,color:"#999",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",marginTop:32,textAlign:"center"}}>
                  Your account is used for Khadlaj updates, wishlists, and private fragrance offers.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}'''

code = code.replace(old_signup_page, new_signup_page)

with open('khadlaj-perfumes (1).jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('SignupPage updated successfully.')
