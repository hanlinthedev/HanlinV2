export function AtlasDrawing() {
 return <figure className="atlas-figure"><figcaption className="atlas-label">FIG. 01 / THE WANDERING SHIPWRIGHT</figcaption><span className="atlas-label atlas-survey">SURVEY UNIT</span><svg className="atlas-drawing" viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="atlas-title">
 <title id="atlas-title">An engineering field sketch of a travelling ship, its instruments, and a survey drone</title>
 <g stroke="currentColor" strokeWidth=".65" opacity=".2"><circle cx="270" cy="200" r="155"/><circle cx="270" cy="200" r="128" strokeDasharray="3 6"/><path d="M40 200H475M270 25V375M100 65L440 335M100 335L440 65"/><path d="M55 55H85M70 40V70M440 330H470M455 315V345"/></g>
 <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
 <g className="atlas-water" opacity=".45"><path className="water-stream water-stream-back" d="M38 310q26-9 52 0t52 0t52 0t52 0t52 0t52 0t52 0t52 0t52 0M25 336q32-8 64 0t64 0t64 0t64 0t64 0t64 0t64 0t64 0"/><path className="water-stream water-stream-front" d="M12 362q25-7 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0"/></g>
 <g className="atlas-ship">
 <path d="M92 268Q230 286 425 248L386 300Q248 355 137 304Z" fill="var(--surface)"/><path d="M102 277Q260 315 414 263M125 291Q258 331 397 283M143 307L150 279M190 320L194 285M242 323L244 285M296 316L296 279M346 309L342 273M382 294L375 266" opacity=".7"/>
 <path d="M121 264L121 241L398 222L417 250M122 242Q240 268 398 222M155 250V272M200 255V280M248 252V281M295 243V277M348 233V267M391 225V256"/>
 <path d="M254 253V64M258 253V64M250 70L308 66"/>
 <g className="atlas-sail atlas-sail-main"><path d="M257 83Q298 95 362 177L266 202Z" fill="var(--canvas)"/><path d="M266 97Q287 119 343 173L268 191"/></g>
 <g className="atlas-sail atlas-sail-jib"><path d="M248 92L158 207L246 211Z" fill="var(--surface)"/><path d="M242 110L175 200L241 201"/></g>
 <path d="M257 64L154 244M258 73L398 222M258 205L364 177"/>

 <path d="M180 249V215L216 207L237 219V253M180 215L202 225L237 219M202 225V256M189 224V237L197 240V227M211 231L226 227V241L211 245Z" fill="var(--canvas)"/>
 <path d="M315 255L313 229L340 219L363 228L365 248M313 229L337 239L363 228M337 239V256"/>
 <path d="M335 219V199M327 206L335 199L343 205M335 199V185M329 186H341"/>
 <path className="atlas-pennant" d="M259 63V47L282 52L259 59" fill="var(--accent-a)"/>
 </g>
 <ellipse className="drone-trail drone-orbit-guide" cx="270" cy="190" rx="195" ry="125" strokeDasharray="2 7" opacity=".22"/>
 <g className="atlas-drone">
 <path d="M403 116L425 111L444 120L422 128ZM413 126V136L423 142L434 135V125M405 116L395 100M442 119L453 105M384 100H407M442 104H464" fill="var(--surface)"/><circle cx="423" cy="133" r="3"/>
 </g>
 </g>
 </svg><span className="atlas-label atlas-motto">AN ATLAS, STILL IN THE MAKING.</span></figure>;
}
