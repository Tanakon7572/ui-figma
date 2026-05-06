import { useState, useEffect, useRef } from "react";

// iPhone 15 Pro dimensions
const W = 393;
const H = 852;
const SAFE_T = 59;
const SAFE_B = 34;
const DI_W = 126; // Dynamic Island
const DI_H = 37;
const TAB_H = 83;

// Design tokens — PaiDeeWa brand
const C = {
  teal: "#0d9488", tealDk: "#0f766e", emerald: "#10b981",
  navy: "#0f172a", slate: "#1e293b",
  bg: "#F2F2F7", card: "#FFFFFF",
  t1: "#000000", t2: "#3C3C43", t3: "#8E8E93", t4: "#C7C7CC",
  sep: "rgba(60,60,67,0.08)",
  blue: "#007AFF", red: "#FF3B30", orange: "#FF9500", green: "#34C759", purple: "#AF52DE", pink: "#FF2D55",
  ai: "#7c3aed",
};

const G = {
  teal: "linear-gradient(135deg, #0d9488, #10b981)",
  sky: "linear-gradient(135deg, #38bdf8, #3b82f6)",
  sunset: "linear-gradient(135deg, #f97316, #ef4444)",
  forest: "linear-gradient(135deg, #22c55e, #06b6d4)",
  purple: "linear-gradient(135deg, #a855f7, #6366f1)",
  coral: "linear-gradient(135deg, #fb7185, #f97316)",
  dark: "linear-gradient(180deg, #0f172a, #1e293b)",
};

// ═══ Reusable Components ═══
const Phone = ({ children, dark }) => (
  <div style={{ width: W, height: H, borderRadius: 55, background: "#000", padding: 3, position: "relative", flexShrink: 0, boxShadow: "0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)" }}>
    <div style={{ width: W - 6, height: H - 6, borderRadius: 52, overflow: "hidden", background: dark ? "#000" : C.bg, position: "relative" }}>
      {children}
      {/* Dynamic Island */}
      <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: DI_W, height: DI_H, background: "#000", borderRadius: 19, zIndex: 100 }} />
    </div>
  </div>
);

const StatusBar = ({ light }) => (
  <div style={{ height: SAFE_T, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 32px 4px", position: "relative", zIndex: 50 }}>
    <span style={{ fontSize: 15, fontWeight: 600, color: light ? "#fff" : "#000", letterSpacing: -0.3 }}>9:41</span>
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <div style={{ width: 17, height: 10.5, border: `1.5px solid ${light ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.5)"}`, borderRadius: 2.5, position: "relative" }}>
        <div style={{ position: "absolute", inset: 1.5, borderRadius: 1, background: light ? "#fff" : "#000" }} />
      </div>
    </div>
  </div>
);

const TabBar = ({ active = "trips" }) => {
  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "trips", icon: "🗺️", label: "Trips" },
    { id: "discover", icon: "🔍", label: "Discover" },
    { id: "stats", icon: "📊", label: "Stats" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: TAB_H, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderTop: "0.5px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-around", alignItems: "flex-start", paddingTop: 8, zIndex: 90 }}>
      {tabs.map(t => (
        <div key={t.id} style={{ textAlign: "center", width: 48 }}>
          <div style={{ fontSize: 22, lineHeight: "26px" }}>{t.icon}</div>
          <div style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 500, color: active === t.id ? C.teal : C.t3, marginTop: 1 }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
};

const GlassBtn = ({ children, style = {} }) => (
  <div style={{ width: 44, height: 44, borderRadius: 22, background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", border: "0.5px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", ...style }}>{children}</div>
);

// ═══ SCREEN 1: Welcome ═══
const WelcomeScreen = () => (
  <Phone dark>
    <div style={{ position: "absolute", inset: 0, background: G.dark, borderRadius: 52, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(13,148,136,0.15)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 250, height: 250, borderRadius: "50%", background: "rgba(16,185,129,0.1)", filter: "blur(50px)" }} />
      <StatusBar light />
      <div style={{ position: "absolute", top: SAFE_T + 10, right: 20 }}>
        <div style={{ padding: "6px 14px", borderRadius: 10, background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>TH</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 160, left: 28, right: 28 }}>
        <div style={{ fontSize: 28, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>Welcome to</div>
        <div style={{ fontSize: 46, fontWeight: 900, color: "#fff", letterSpacing: -1.5, lineHeight: 1.1, marginTop: 4 }}>PaiDeeWa</div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 12, lineHeight: 1.5 }}>วางแผน แบ่งค่าใช้จ่าย<br/>และเที่ยวด้วยกัน</div>
      </div>
      <div style={{ position: "absolute", bottom: SAFE_B + 20, left: 28, right: 28, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <div style={{ width: "100%", height: 56, borderRadius: 28, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#000" }}>Create an account</span>
        </div>
        <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }}>Already have? <span style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>Log in</span></span>
      </div>
    </div>
  </Phone>
);

// ═══ SCREEN 2: Sign Up ═══
const SignUpScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <span style={{ fontSize: 20, color: C.navy }}>‹</span>
        <div style={{ textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>Create Account</div><div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>Step 1 of 3</div></div>
        <div style={{ width: 20 }} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 4 }}>สร้างบัญชีใหม่</div>
      <div style={{ fontSize: 14, color: C.t3, marginBottom: 28, lineHeight: 1.5 }}>เริ่มต้นวางแผนเที่ยวกับเพื่อนๆ</div>
      <div style={{ width: "100%", height: 52, borderRadius: 16, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>✉️ Continue with email</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "8px 0" }}>
        <div style={{ flex: 1, height: 0.5, background: C.sep }} />
        <span style={{ fontSize: 13, color: C.t3 }}>or</span>
        <div style={{ flex: 1, height: 0.5, background: C.sep }} />
      </div>
      {["Apple", "Facebook", "Google"].map(s => (
        <div key={s} style={{ width: "100%", height: 52, borderRadius: 14, border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12, background: "#fff" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.navy }}>{s === "Apple" ? "🍎" : s === "Google" ? "🔵" : "📘"} Continue with {s}</span>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", bottom: SAFE_B + 16, left: 0, right: 0, textAlign: "center", borderTop: "0.5px solid #f3f4f6", paddingTop: 16 }}>
      <span style={{ fontSize: 15, color: "#6b7280" }}>มีบัญชีอยู่แล้ว? <span style={{ color: C.navy, fontWeight: 700 }}>เข้าสู่ระบบ</span></span>
    </div>
  </Phone>
);

// ═══ SCREEN 3: Email & Password ═══
const EmailPasswordScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 20, color: C.navy }}>‹</span>
        <div style={{ textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>Email & Password</div><div style={{ fontSize: 11, color: C.t3 }}>1 / 3</div></div>
        <div style={{ width: 20 }} />
      </div>
      <label style={{ fontSize: 14, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email</label>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", marginBottom: 18, background: "#fff" }}>
        <span style={{ color: "#9ca3af", fontSize: 16 }}>example@mail.com</span>
      </div>
      <label style={{ fontSize: 14, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", marginBottom: 12, background: "#fff", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#9ca3af", fontSize: 16 }}>••••••••</span>
        <span style={{ color: "#9ca3af" }}>👁️</span>
      </div>
      {/* Strength bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {[1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= 3 ? "#22c55e" : "#e5e7eb" }} />)}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", marginBottom: 12 }}>Good</div>
      {/* Requirements */}
      {["✓ At least 8 characters", "✓ One uppercase letter", "✓ One number", "○ One special character"].map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0" }}>
          <span style={{ fontSize: 13, color: r.startsWith("✓") ? "#22c55e" : "#9ca3af", fontWeight: 500 }}>{r}</span>
        </div>
      ))}
      <label style={{ fontSize: 14, fontWeight: 600, color: "#374151", display: "block", margin: "18px 0 6px" }}>Confirm Password</label>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", marginBottom: 24, background: "#fff" }}>
        <span style={{ color: "#9ca3af", fontSize: 16 }}>••••••••</span>
      </div>
      <div style={{ width: "100%", height: 52, borderRadius: 16, background: G.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Next</span>
      </div>
    </div>
  </Phone>
);

// ═══ SCREEN 4: OTP Verify ═══
const OTPScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 20, color: C.navy }}>‹</span>
        <div style={{ textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>Verify Email</div><div style={{ fontSize: 11, color: C.t3 }}>2 / 3</div></div>
        <div style={{ width: 20 }} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 8 }}>ยืนยันอีเมล</div>
      <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5, marginBottom: 32 }}>เราส่งรหัส 6 หลักไปที่ <span style={{ fontWeight: 700, color: C.navy }}>user@mail.com</span></div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32 }}>
        {[3, 8, 4, 2, "", ""].map((d, i) => (
          <div key={i} style={{ width: 48, height: 56, borderRadius: 12, border: `2px solid ${d !== "" ? C.navy : "#e5e7eb"}`, background: d !== "" ? "#fff" : "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: C.navy }}>{d}</span>
          </div>
        ))}
      </div>
      <div style={{ width: "100%", height: 52, borderRadius: 16, background: "#d1d5db", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Verify</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <div style={{ fontSize: 12, color: C.t3, marginBottom: 4 }}>Code expires in 4:32</div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>ไม่ได้รับรหัส? <span style={{ color: C.navy, fontWeight: 700 }}>ส่งใหม่</span></div>
      </div>
    </div>
  </Phone>
);

// ═══ SCREEN 5: Profile Setup ═══
const ProfileSetupScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 20, color: C.navy }}>‹</span>
        <div style={{ textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>Set Up Profile</div><div style={{ fontSize: 11, color: C.t3 }}>3 / 3</div></div>
        <div style={{ width: 20 }} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 4 }}>เกือบเสร็จแล้ว!</div>
      <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>ตั้งค่าโปรไฟล์เพื่อให้เพื่อนค้นหาคุณได้</div>
      {/* Avatar */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 96, height: 96, borderRadius: 48, background: "linear-gradient(135deg, #e0f2fe, #ccfbf1)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <span style={{ fontSize: 36 }}>👤</span>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
            <span style={{ fontSize: 12, color: "#fff" }}>📷</span>
          </div>
        </div>
      </div>
      {[{ l: "Display Name", p: "John Doe" }, { l: "Username", p: "johndoe" }, { l: "PromptPay ID", p: "08X-XXX-XXXX" }].map(f => (
        <div key={f.l} style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 14, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{f.l}</label>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", background: "#fff" }}>
            <span style={{ color: "#9ca3af", fontSize: 16 }}>{f.p}</span>
          </div>
        </div>
      ))}
      <div style={{ width: "100%", height: 52, borderRadius: 16, background: G.teal, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Complete Setup</span>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <span style={{ fontSize: 15, color: "#6b7280", fontWeight: 600, textDecoration: "underline" }}>Skip for now</span>
      </div>
    </div>
  </Phone>
);

// ═══ SCREEN 6: My Trips ═══
const MyTripsScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: `0 20px`, height: H - 6, overflow: "hidden", position: "relative" }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: C.t3, marginBottom: 2 }}>Good morning ☀️</div>
      <div style={{ fontSize: 34, fontWeight: 900, color: C.navy, letterSpacing: -0.5, marginBottom: 16 }}>My Trips</div>
      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[{ v: "3", l: "TOTAL" }, { v: "1", l: "UPCOMING" }, { v: "8", l: "DAYS" }].map(s => (
          <div key={s.l} style={{ flex: 1, background: "#fff", borderRadius: 12, padding: "12px 10px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.navy }}>{s.v}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.t3, letterSpacing: 0.5 }}>{s.l}</div>
          </div>
        ))}
      </div>
      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(118,118,128,0.12)", borderRadius: 10, padding: "8px 12px", marginBottom: 16 }}>
        <span style={{ fontSize: 14, color: C.t3 }}>🔍</span>
        <span style={{ fontSize: 16, color: C.t3 }}>Search trips</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: C.t3, letterSpacing: 0.5, marginBottom: 10 }}>YOUR TRIPS</div>
      {/* Trip Cards */}
      {[
        { t: "Summer in Tokyo", d: "15 – 20 มิ.ย.", g: G.sky, icon: "🏖️", badge: { t: "5d", c: C.orange } },
        { t: "เที่ยวเชียงใหม่", d: "22 – 25 ก.ค.", g: G.forest, icon: "⛰️", badge: { t: "Ongoing", c: C.teal } },
        { t: "Cafe Hopping BKK", d: "1 ส.ค.", g: G.coral, icon: "☕", badge: null },
        { t: "Camping ดอยอินทนนท์", d: "10 – 12 ก.ย.", g: G.sunset, icon: "⛺", badge: { t: "Past", c: C.t3 } },
      ].map((tr, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 22, padding: "12px 14px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: tr.g, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{tr.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tr.t}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
              <span style={{ fontSize: 13, color: C.t3, fontWeight: 500 }}>{tr.d}</span>
              {tr.badge && <span style={{ fontSize: 10, fontWeight: 700, color: tr.badge.c, background: tr.badge.c + "18", padding: "2px 6px", borderRadius: 5 }}>{tr.badge.t}</span>}
            </div>
          </div>
          <span style={{ fontSize: 16, color: C.t4 }}>›</span>
        </div>
      ))}
      {/* FAB */}
      <div style={{ position: "absolute", bottom: TAB_H + 20, right: 20, width: 58, height: 58, borderRadius: 29, background: G.teal, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(13,148,136,0.4)", zIndex: 50 }}>
        <span style={{ fontSize: 28, color: "#fff", fontWeight: 300, lineHeight: 1 }}>+</span>
      </div>
    </div>
    <TabBar active="trips" />
  </Phone>
);

// ═══ SCREEN 7: Create Trip ═══
const CreateTripScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: "0 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: C.navy }}>New Trip</span>
        <div style={{ width: 30, height: 30, borderRadius: 15, background: "rgba(118,118,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, color: "#64748b" }}>✕</span>
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.t3, letterSpacing: 0.6, marginBottom: 6, marginLeft: 4 }}>TITLE</div>
      <div style={{ background: "rgba(116,116,128,0.08)", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
        <span style={{ fontSize: 17, color: C.teal, fontWeight: 600 }}>Summer in Tokyo ✨</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.t3, letterSpacing: 0.6, marginBottom: 6, marginLeft: 4 }}>DATES</div>
      <div style={{ background: "rgba(116,116,128,0.08)", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={{ fontSize: 17, color: C.navy }}>Start</span>
          <span style={{ fontSize: 17, color: C.teal }}>15 มิ.ย. 2568</span>
        </div>
        <div style={{ height: 0.5, background: C.sep, marginLeft: 16 }} />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={{ fontSize: 17, color: C.navy }}>End</span>
          <span style={{ fontSize: 17, color: C.teal }}>20 มิ.ย. 2568</span>
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.t3, letterSpacing: 0.6, marginBottom: 6, marginLeft: 4 }}>SHARING</div>
      <div style={{ background: "rgba(116,116,128,0.08)", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div><div style={{ fontSize: 17, color: C.navy }}>Public</div><div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>Anyone can view & clone</div></div>
        <div style={{ width: 51, height: 31, borderRadius: 16, background: C.green, position: "relative" }}>
          <div style={{ position: "absolute", top: 2, right: 2, width: 27, height: 27, borderRadius: 14, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
        </div>
      </div>
      <div style={{ width: "100%", height: 48, borderRadius: 999, background: G.teal, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <span style={{ fontSize: 16, color: "#fff" }}>+</span>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Create Trip</span>
      </div>
    </div>
  </Phone>
);

// ═══ SCREEN 8: Trip Detail (Map) ═══
const TripDetailScreen = () => (
  <Phone>
    <div style={{ position: "absolute", inset: 0, borderRadius: 52, overflow: "hidden" }}>
      {/* Map BG */}
      <div style={{ height: "60%", background: "linear-gradient(180deg, #bae6fd 0%, #e0f2fe 60%, #dbeafe 100%)", position: "relative" }}>
        <StatusBar light={false} />
        {/* Route markers */}
        <div style={{ position: "absolute", top: 140, left: 80 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: "#fff", border: "2px solid #0d9488", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 11, fontWeight: 800, color: C.teal }}>1</span></div>
        </div>
        <div style={{ position: "absolute", top: 200, left: 200 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: C.teal, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>2</span></div>
        </div>
        <div style={{ position: "absolute", top: 260, left: 140 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: "#fff", border: "2px solid #0d9488", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 11, fontWeight: 800, color: C.teal }}>3</span></div>
        </div>
        {/* Glass header */}
        <div style={{ position: "absolute", top: SAFE_T + 6, left: 16, right: 16, display: "flex", gap: 10, alignItems: "center" }}>
          <GlassBtn><span style={{ fontSize: 18, color: C.navy }}>‹</span></GlassBtn>
          <div style={{ flex: 1, height: 44, borderRadius: 20, background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", border: "0.5px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", padding: "0 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: C.navy }}>Summer Tokyo</span>
          </div>
          <GlassBtn><span style={{ fontSize: 16 }}>💰</span></GlassBtn>
        </div>
      </div>
      {/* Bottom card */}
      <div style={{ position: "absolute", bottom: 24, left: 20, right: 20 }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.15)", margin: "0 auto 12px" }} />
        <div style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", borderRadius: 24, padding: 20, boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: "#ccfbf1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📍</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.navy }}>Senso-ji Temple</div>
              <div style={{ fontSize: 12, color: C.t3 }}>Asakusa, Tokyo</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.orange, marginTop: 4 }}>🕒 9:30 AM</div>
            </div>
          </div>
          {/* Dots */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16 }}>
            <div style={{ width: 22, height: 5, borderRadius: 3, background: C.teal }} />
            <div style={{ width: 5, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.12)" }} />
            <div style={{ width: 5, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.12)" }} />
          </div>
        </div>
      </div>
    </div>
  </Phone>
);

// ═══ SCREEN 9: Discover ═══
const DiscoverScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: "0 20px", height: H - 6, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div><div style={{ fontSize: 28, fontWeight: 900, color: C.navy }}>Discover</div><div style={{ fontSize: 13, color: "#64748b" }}>Nearby places</div></div>
        <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 12, padding: "6px 12px", display: "flex", alignItems: "center", gap: 4, backdropFilter: "blur(10px)" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: C.teal }}>⚙️ 5 km</span>
        </div>
      </div>
      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.7)", borderRadius: 14, padding: "10px 14px", marginTop: 12, backdropFilter: "blur(10px)" }}>
        <span style={{ fontSize: 14, color: C.t3 }}>🔍</span>
        <span style={{ fontSize: 15, color: C.t3, fontWeight: 500 }}>Search places...</span>
      </div>
      {/* Categories */}
      <div style={{ display: "flex", gap: 6, marginTop: 12, overflow: "hidden" }}>
        {[{ l: "🍴 Restaurant", c: "#ef4444", a: true }, { l: "☕ Cafe", a: false }, { l: "📸 Attraction", a: false }, { l: "🛍️ Shopping", a: false }].map(c => (
          <div key={c.l} style={{ padding: "6px 12px", borderRadius: 16, background: c.a ? c.c : "#fff", border: c.a ? "none" : "0.5px solid #e2e8f0", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.a ? "#fff" : "#334155" }}>{c.l}</span>
          </div>
        ))}
      </div>
      {/* AI Section */}
      <div style={{ background: "#f5f3ff", borderRadius: 18, padding: 14, marginTop: 14, border: "0.5px solid #ede9fe" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: C.ai, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 12, color: "#fff" }}>✨</span></div>
          <div><div style={{ fontSize: 14, fontWeight: 900, color: C.navy }}>แนะนำสำหรับคุณ</div><div style={{ fontSize: 10, color: C.ai, fontWeight: 600 }}>AI คัดเลือก Top 3</div></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ n: "Cafe Kaldi", r: "4.6", d: "0.3km", bg: "#ec4899" }, { n: "วัดพระแก้ว", r: "4.8", d: "1.2km", bg: "#3b82f6" }].map((p, i) => (
            <div key={i} style={{ width: 140, borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ height: 70, background: p.bg, position: "relative" }}>
                <div style={{ position: "absolute", top: 6, left: 6, background: C.ai, padding: "2px 6px", borderRadius: 5 }}><span style={{ fontSize: 9, fontWeight: 900, color: "#fff" }}>#{i + 1}</span></div>
              </div>
              <div style={{ padding: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.navy }}>{p.n}</div>
                <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>⭐ {p.r} · {p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* All places */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, marginBottom: 10 }}>
        <div style={{ width: 4, height: 16, borderRadius: 2, background: C.teal }} />
        <span style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>สถานที่ทั้งหมด</span>
        <span style={{ fontSize: 12, color: C.t3 }}>(24)</span>
      </div>
      <div style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
        <div style={{ height: 80, background: "linear-gradient(135deg, #fecdd3, #fda4af)" }} />
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>ร้านก๋วยเตี๋ยวเรือ</div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.teal }}>0.8 km</span>
            <span style={{ fontSize: 12, color: "#64748b" }}>⭐ 4.3 (128)</span>
          </div>
        </div>
      </div>
    </div>
    <TabBar active="discover" />
  </Phone>
);

// ═══ SCREEN 10: Expenses ═══
const ExpensesScreen = () => (
  <Phone>
    <StatusBar />
    <div style={{ padding: "0 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 22, fontWeight: 900, color: C.navy }}>Expenses</span>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#475569" }}>Done</span>
      </div>
      {/* Total */}
      <div style={{ background: G.teal, borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: "0 8px 24px rgba(13,148,136,0.25)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 1.5 }}>TOTAL TRIP SPENDING</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginTop: 4 }}>฿8,450</div>
      </div>
      {/* Add expense */}
      <div style={{ background: "#f8fafc", borderRadius: 18, padding: 16, marginBottom: 16 }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 16px", marginBottom: 8, background: "#fff" }}><span style={{ color: "#9ca3af" }}>Amount (฿)</span></div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 16px", marginBottom: 8, background: "#fff" }}><span style={{ color: "#9ca3af" }}>What was it for?</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>Split between:</span>
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 20px", background: "#fff" }}><span style={{ fontWeight: 700, color: C.navy }}>4</span></div>
        </div>
        <div style={{ height: 44, borderRadius: 12, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Add Expense</span>
        </div>
      </div>
      {/* Expense list */}
      {[{ d: "ข้าวผัดกุ้ง", p: "สมชาย", a: "฿120" }, { d: "ค่ารถแท็กซี่", p: "สมหญิง", a: "฿350" }, { d: "ค่าตั๋วเข้าวัด", p: "สมศรี", a: "฿50" }].map((e, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", padding: 14, borderRadius: 16, marginBottom: 8, border: "0.5px solid #f1f5f9" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{e.d}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>จ่ายโดย: {e.p}</div>
          </div>
          <span style={{ fontSize: 16, fontWeight: 900, color: C.navy }}>{e.a}</span>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center" }}>📱</div>
        </div>
      ))}
    </div>
  </Phone>
);

// ═══ SCREEN 11: QR Payment ═══
const QRPaymentScreen = () => (
  <Phone dark>
    <div style={{ position: "absolute", inset: 0, borderRadius: 52, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 340, background: "#fff", borderRadius: 32, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: C.navy, marginBottom: 4 }}>Scan to Pay</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#64748b", marginBottom: 20 }}>Transfer to สมชาย</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.t3, marginBottom: 6, letterSpacing: 0.5 }}>PROMPTPAY ID</div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>081-234-5678</span>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.t3, marginBottom: 6, letterSpacing: 0.5 }}>AMOUNT (฿)</div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "12px 16px", marginBottom: 24 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>120.00</span>
        </div>
        <div style={{ width: 200, height: 200, background: "#f8fafc", borderRadius: 20, margin: "0 auto 24px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, color: C.t3 }}>[ QR CODE ]</span>
        </div>
        <div style={{ height: 44, borderRadius: 12, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Save PromptPay ID</span>
        </div>
        <div style={{ height: 44, borderRadius: 12, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#475569" }}>Close</span>
        </div>
      </div>
    </div>
  </Phone>
);

// ═══ SCREEN 12: Statistics ═══
const StatisticsScreen = () => (
  <Phone>
    <div style={{ position: "absolute", inset: 0, borderRadius: 52, overflow: "hidden", background: "linear-gradient(180deg, #f0fdfa, #ccfbf1 30%, #f0fdfa)" }}>
      <StatusBar />
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
          <span style={{ fontSize: 12 }}>✨</span>
          <span style={{ fontSize: 11, fontWeight: 900, color: C.ai, letterSpacing: 1.5 }}>TRAVEL DASHBOARD</span>
        </div>
        <div style={{ fontSize: 34, fontWeight: 900, color: C.navy, letterSpacing: -0.5 }}>Statistics</div>
        <div style={{ fontSize: 13, color: C.t3, marginTop: 2, marginBottom: 16 }}>Your travel overview</div>
        {/* Hero */}
        <div style={{ background: G.teal, borderRadius: 22, padding: 22, marginBottom: 12, boxShadow: "0 8px 24px rgba(13,148,136,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>📈</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 1.5 }}>TOTAL LIFETIME SPENDING</span>
          </div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>฿24,850</div>
        </div>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[{ v: "3", l: "Total Trips", bg: "#ccfbf1", ic: "✈️" }, { v: "12", l: "Places", bg: "#e0f2fe", ic: "📍" }, { v: "15", l: "Days", bg: "#d1fae5", ic: "📅" }, { v: "฿8.3K", l: "Avg/Trip", bg: "#fed7aa", ic: "🧾" }].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", borderRadius: 20, padding: 16, border: "0.5px solid rgba(255,255,255,0.5)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 10, border: "0.5px solid rgba(255,255,255,0.4)" }}>{s.ic}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.navy }}>{s.v}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.t3, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", borderRadius: 20, padding: 16, border: "0.5px solid rgba(255,255,255,0.5)" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, marginBottom: 12 }}>📊 Spending by Trip</div>
          {[{ t: "Summer Tokyo", a: 12400, c: "#3b82f6" }, { t: "เชียงใหม่", a: 8200, c: "#8b5cf6" }, { t: "Cafe Hopping", a: 4250, c: "#f97316" }].map((b, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{b.t}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.navy }}>฿{b.a.toLocaleString()}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: "rgba(241,245,249,0.8)", overflow: "hidden" }}>
                <div style={{ height: 8, borderRadius: 4, width: `${(b.a / 12400) * 100}%`, background: b.c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <TabBar active="stats" />
  </Phone>
);

// ═══ SCREEN 13: Profile ═══
const ProfileScreen = () => (
  <Phone>
    <div style={{ position: "absolute", inset: 0, borderRadius: 52, overflow: "hidden" }}>
      {/* Map BG */}
      <div style={{ height: "48%", background: "linear-gradient(180deg, #bae6fd, #dbeafe)", position: "relative" }}>
        <StatusBar />
        {/* Glass top bar */}
        <div style={{ position: "absolute", top: SAFE_T + 6, left: 16, right: 16, display: "flex", gap: 10, alignItems: "center" }}>
          <GlassBtn><span style={{ fontSize: 16 }}>🔔</span></GlassBtn>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", borderRadius: 22, padding: "0 16px", height: 44, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
            <span style={{ fontSize: 14 }}>🌐</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.teal }}>Scratch</span>
          </div>
          <div style={{ flex: 1 }} />
          <GlassBtn><span style={{ fontSize: 16 }}>🔍</span></GlassBtn>
        </div>
        {/* Active trip */}
        <div style={{ position: "absolute", top: SAFE_T + 60, left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "10px 20px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: C.green }} />
          <span style={{ fontSize: 13, fontWeight: 800, color: C.navy }}>Summer Tokyo</span>
        </div>
      </div>
      {/* Bottom sheet */}
      <div style={{ position: "absolute", top: "46%", left: 0, right: 0, bottom: 0, background: "#fff", borderTopLeftRadius: 32, borderTopRightRadius: 32, boxShadow: "0 -10px 30px rgba(0,0,0,0.05)" }}>
        <div style={{ width: 50, height: 5, borderRadius: 3, background: "#e7e7e7", margin: "12px auto 16px" }} />
        {/* Avatar + Stats */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 24px", marginBottom: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 16 }}><span style={{ fontSize: 28, color: C.t3 }}>U</span></div>
          <div style={{ display: "flex", gap: 24 }}>
            {[{ v: "0", l: "Followers" }, { v: "0", l: "Following" }, { v: "3", l: "Trips" }].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 900, color: C.navy }}>{s.v}</div><div style={{ fontSize: 10, fontWeight: 500, color: "#64748b" }}>{s.l}</div></div>
            ))}
          </div>
        </div>
        {/* Name */}
        <div style={{ padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div><div style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>Traveler</div><div style={{ fontSize: 13, color: "#64748b" }}>@traveler</div></div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 14 }}>⚙️</span></div>
            <div style={{ width: 36, height: 36, borderRadius: 18, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 14 }}>🔗</span></div>
          </div>
        </div>
        {/* CTA */}
        <div style={{ margin: "0 24px 16px", height: 44, borderRadius: 22, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "#fff" }} />
          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Now travelling</span>
        </div>
      </div>
    </div>
    <TabBar active="profile" />
  </Phone>
);

// ═══ SCREEN 14: Notifications ═══
const NotificationsScreen = () => (
  <Phone>
    <div style={{ position: "absolute", inset: 0, borderRadius: 52, overflow: "hidden", background: "linear-gradient(180deg, #f0fdfa, #ccfbf1 30%, #f0fdfa)" }}>
      <StatusBar />
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 10 }}>✨</span><span style={{ fontSize: 10, fontWeight: 900, color: C.teal, letterSpacing: 1.5 }}>STAY UPDATED</span></div>
            <div style={{ fontSize: 34, fontWeight: 900, color: C.navy, letterSpacing: -0.5 }}>Notifications</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(13,148,136,0.08)", borderRadius: 10, padding: "6px 10px", border: "0.5px solid rgba(13,148,136,0.15)" }}>
            <span style={{ fontSize: 10 }}>🗑️</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.teal }}>Clear</span>
          </div>
        </div>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[{ l: "ทั้งหมด", a: true, n: 3 }, { l: "คำเชิญ", a: false, n: 1 }, { l: "กิจกรรม", a: false, n: 2 }].map(t => (
            <div key={t.l} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "10px 0", borderRadius: 14, background: t.a ? G.teal : "rgba(255,255,255,0.7)", border: t.a ? "none" : "0.5px solid rgba(226,232,240,0.6)" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: t.a ? "#fff" : "#64748b" }}>{t.l}</span>
              <div style={{ minWidth: 18, height: 16, borderRadius: 8, background: t.a ? "rgba(255,255,255,0.25)" : "rgba(13,148,136,0.12)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                <span style={{ fontSize: 9, fontWeight: 900, color: t.a ? "#fff" : C.teal }}>{t.n}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Invite */}
        <div style={{ fontSize: 11, fontWeight: 700, color: C.t3, letterSpacing: 1.5, marginBottom: 10 }}>PENDING INVITES</div>
        <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", borderRadius: 20, padding: 16, border: "0.5px solid rgba(255,255,255,0.5)", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: G.sky, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 18, color: "#fff" }}>🗺️</span></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>Trip Invitation!</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}><span style={{ color: C.teal, fontWeight: 700 }}>สมชาย</span> invited you to <span style={{ fontWeight: 700 }}>Summer Tokyo</span></div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <div style={{ padding: "7px 14px", borderRadius: 10, background: C.green, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>✓ Accept</span>
                </div>
                <div style={{ padding: "7px 14px", borderRadius: 10, background: "#f1f5f9", border: "0.5px solid #e2e8f0" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>✕ Decline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Activity */}
        <div style={{ fontSize: 11, fontWeight: 700, color: C.t3, letterSpacing: 1.5, marginBottom: 10 }}>ACTIVITY</div>
        {[{ t: "Joined Trip", m: "You joined Summer Tokyo", icon: "🗺️" }, { t: "Profile Updated", m: "PromptPay ID saved", icon: "⚙️" }].map((n, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.7)", borderRadius: 18, padding: 14, marginBottom: 8, display: "flex", gap: 10, border: "0.5px solid rgba(255,255,255,0.5)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(241,245,249,0.7)", display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid rgba(226,232,240,0.5)" }}><span style={{ fontSize: 14 }}>{n.icon}</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.navy }}>{n.t}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 1 }}>{n.m}</div>
            </div>
            <span style={{ fontSize: 12, color: "#f87171" }}>🗑️</span>
          </div>
        ))}
      </div>
    </div>
    <TabBar active="home" />
  </Phone>
);

// ═══ SCREEN 15: Settings ═══
const SettingsScreen = () => (
  <Phone dark>
    <div style={{ position: "absolute", inset: 0, borderRadius: 52, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end" }}>
      <div style={{ width: "100%", background: "#fff", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: "24px 24px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: C.navy }}>Settings</span>
          <span style={{ fontSize: 18, color: "#64748b" }}>✕</span>
        </div>
        {[
          { ic: "👤", l: "Edit Profile", c: C.teal },
          { ic: "🔒", l: "Account & Security", c: "#6366f1" },
          { ic: "💳", l: "PromptPay", c: C.orange },
          { ic: "🔔", l: "Notifications", c: C.blue },
          { ic: "💎", l: "Subscription", c: C.pink },
          { ic: "🎨", l: "Dark Mode", c: C.purple, toggle: true },
          { ic: "🔗", l: "Share Profile", c: "#0ea5e9" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "0.5px solid #f1f5f9" }}>
            <span style={{ fontSize: 16 }}>{s.ic}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: C.navy, flex: 1 }}>{s.l}</span>
            {s.toggle ? (
              <div style={{ width: 51, height: 31, borderRadius: 16, background: "#e2e8f0", position: "relative" }}>
                <div style={{ position: "absolute", top: 2, left: 2, width: 27, height: 27, borderRadius: 14, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
              </div>
            ) : (
              <span style={{ fontSize: 14, color: "#cbd5e1" }}>›</span>
            )}
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 16, padding: "14px 0" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.red }}>Log Out</span>
        </div>
      </div>
    </div>
  </Phone>
);

// ═══ MAIN APP ═══
const screens = [
  { id: "welcome", name: "Welcome", comp: WelcomeScreen },
  { id: "signup", name: "Sign Up", comp: SignUpScreen },
  { id: "email", name: "Email & Password", comp: EmailPasswordScreen },
  { id: "otp", name: "OTP Verify", comp: OTPScreen },
  { id: "profile-setup", name: "Profile Setup", comp: ProfileSetupScreen },
  { id: "trips", name: "My Trips", comp: MyTripsScreen },
  { id: "create", name: "Create Trip", comp: CreateTripScreen },
  { id: "detail", name: "Trip Detail", comp: TripDetailScreen },
  { id: "discover", name: "Discover", comp: DiscoverScreen },
  { id: "expenses", name: "Expenses", comp: ExpensesScreen },
  { id: "qr", name: "QR Payment", comp: QRPaymentScreen },
  { id: "stats", name: "Statistics", comp: StatisticsScreen },
  { id: "profile", name: "Profile", comp: ProfileScreen },
  { id: "notifications", name: "Notifications", comp: NotificationsScreen },
  { id: "settings", name: "Settings", comp: SettingsScreen },
];

export default function App() {
  const [active, setActive] = useState(0);
  const Comp = screens[active].comp;

  return (
    <div style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif", background: "#f0f0f0", minHeight: "100vh", padding: "24px 0" }}>
      {/* Navigation */}
      <div style={{ display: "flex", gap: 6, padding: "0 20px", marginBottom: 24, flexWrap: "wrap", maxWidth: 860, margin: "0 auto 24px" }}>
        {screens.map((s, i) => (
          <button key={s.id} onClick={() => setActive(i)} style={{ padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: active === i ? 700 : 500, color: active === i ? "#fff" : "#64748b", background: active === i ? "#0d9488" : "#fff", boxShadow: active === i ? "0 2px 8px rgba(13,148,136,0.3)" : "0 1px 2px rgba(0,0,0,0.05)", transition: "all 0.15s" }}>
            {s.name}
          </button>
        ))}
      </div>
      {/* Phone */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Comp />
      </div>
      {/* Info */}
      <div style={{ textAlign: "center", marginTop: 24, color: "#8E8E93", fontSize: 13 }}>
        <strong>PaiDeeWa</strong> — iPhone 15 Pro (393×852) — Screen {active + 1} of {screens.length}
      </div>
    </div>
  );
}
