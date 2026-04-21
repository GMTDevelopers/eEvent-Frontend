import Header from "../(components)/header/page";
import styles from "./tofUse.module.css";
const TermsofUse = () => {
    return ( 
        <div className="main">
            <Header img='/images/TandC.png' header='eEvents Terms of Use' subHeader="Our Terms of Use protect both clients and vendors, ensuring fairness, safety, and transparency on eEvents."/>

            <div className={styles.tcContainer}>
                <h3 className={styles.header}>Terms and Conditions</h3>
                <p>
                    <b>Effective Date</b>: April 17,2026 <br /><br />
                    Welcome to *Eevent* (“we,” “our,” “us”). By accessing or using our platform, website, mobile app, or related services (“Services”), you agree to be bound by these Terms and Services (“Terms”). Please read them carefully.
                    <br />
                    If you do not agree with these Terms, you may not use our Services.
                </p> <br />
                <p style={{fontWeight: '700', color:'#222222'}}>1. ABOUT E-EVENTS</p>
                <p>
                    An Eevent is an online marketplace for everything events, connecting users with vendors, service providers, planners, and event-related products and services. We facilitate discovery, booking, communication, and transactions between users and third-party providers.
                </p>
                <br />
                <p style={{fontWeight: '700', color:'#222222'}}>2. ELIGIBILITY</p>
                <p>
                    To use our Services, you must:
                    <ul className={styles.list}>
                        <li>Be at least 18 years old, or the legal age of majority in your jurisdiction;</li>
                        <li>Have the legal capacity to enter into a binding agreement;</li>
                        <li>Provide accurate, current, and complete information when registering.</li>    
                    </ul>
                    By using our Services, you represent that you meet these requirements.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>3. Account Registration</p>
                <p>
                    To access certain features, you may need to create an account. You agree to:
                    <ul className={styles.list}>
                        <li>Provide true, accurate, and complete information;</li>
                        <li>Keep your login credentials secure;</li>
                        <li>Notify us immediately of any unauthorized use of your account</li>    
                        <li>Be responsible for all activity under your account</li>    
                    </ul>
                    We reserve the right to suspend or terminate accounts that violate these Terms.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>4. Use of the Platform</p>
                <p>
                    You agree to use An Eevent only for lawful purposes and in a manner that does not:
                    <ul className={styles.list}>
                        <li>Violate any applicable law or regulation</li>
                        <li>Infringe on the rights of others;</li>
                        <li>Disrupt or damage our platform, systems, or services;</li>    
                        <li>Misrepresent your identity or affiliation</li>    
                        <li>Post false, misleading, abusive, or harmful content.</li>    
                    </ul>
                    We may remove content or restrict access where necessary to protect users or the platform
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>5. Marketplace Role</p>
                <p>
                    An Eevent is a marketplace platform, not the direct provider of most event services or products. This means:
                    <ul className={styles.list}>
                        <li>Vendors and service providers are independent third parties</li>
                        <li>We do not guarantee the quality, safety, legality, or suitability of third-party offerings;</li>
                        <li>Any agreement between you and a vendor is solely between you and that vendor;</li>    
                        <li>You are responsible for reviewing vendor details, pricing, terms, and cancellation policies before booking.</li>    
                    </ul>
                </p>
             {/*    <br /> */}
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>6. Listings and Vendor Content</p>
                <p>
                    Vendors may post listings, descriptions, images, pricing, and availability. Vendors are responsible for ensuring their content is accurate, lawful, and up to date.
                    <br />
                    We may review, edit, reject, or remove listings that violate our policies or are otherwise inappropriate.
                    
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>7. Booking and Payment</p>
                <p>
                    When you make a booking or purchase through An Eevent:
                    <ul className={styles.list}>
                        <li>You agree to pay all applicable fees, taxes, and charges;</li>
                        <li>Payment processing may be handled by third-party payment providers;</li>
                        <li>Refunds, cancellations, and rescheduling are subject to the vendor’s policy and any applicable platform policy;</li>    
                        <li>We may charge service fees, commissions, or transaction fees, where disclosed</li>    
                    </ul>
                    You are responsible for reviewing all booking details before confirming payment.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>8. Cancellations and Refunds</p>
                <p>
                    Cancellation and refund terms may vary by vendor, event type, and booking arrangement.
                    <br />Unless otherwise stated:
                    <ul className={styles.list}>
                        <li>Refunds are not guaranteed;</li>
                        <li>Service fees may be non-refundable;</li>
                        <li>Disputes should first be raised with the vendor and, where applicable, with our support team.</li>      
                    </ul>
                    We may assist in resolving disputes but are not obligated to issue refunds unless required by law or explicitly stated in our policy.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>9. Reviews and User Content</p>
                <p>
                    Users may submit reviews, ratings, comments, images, and other content (“User Content”).
                    <br />
                    By posting User Content, you grant An Eevent a non-exclusive, worldwide, royalty-free, sublicensable license to use, display, reproduce, modify, and distribute such content for platform-related purposes.
                    You agree not to post content that is:
                    <ul className={styles.list}>
                        <li>False, defamatory, abusive, obscene, or unlawful;</li>
                        <li>Infringing on intellectual property or privacy rights;</li>
                        <li>Spam or misleading promotional material.</li>      
                    </ul>
                    We may remove User Content at our discretion.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>10. Intellectual Property</p>
                <p>
                    All content on An Eevent, including logos, graphics, text, software, and design elements, is owned by or licensed to An Eevent and protected by applicable intellectual property laws.
                    <br />
                    You may not copy, modify, distribute, sell, or exploit any part of the platform without our prior written permission, except where permitted by law.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>11. Third-Party Links and Services</p>
                <p>
                    Our Services may contain links or integrations with third-party websites, tools, or services. We are not responsible for the content, policies, or practices of third parties. Use of third-party services is at your own risk.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>12. Prohibited Activities</p>
                <p>
                    You agree not to:
                    <br />                    
                    <ul className={styles.list}>
                        <li>Use the platform for fraud or deceptive practices;</li>
                        <li>Interfere with security features or system integrity;</li>
                        <li>Scrape, harvest, or collect data without permission;</li> 
                        <li>Use bots, malware, or other harmful code;</li>     
                        <li>Abuse, harass, or impersonate others;</li>     
                        <li>Circumvent fees, platform rules, or payment systems.</li>     
                    </ul>
                    Violations may result in account suspension, termination, and legal action.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>13. Privacy</p>
                <p>
                    Your use of An Eevent is also governed by our Privacy Policy, which explains how we collect, use, and protect your information. By using our Services, you consent to our data practices as described in the Privacy Policy.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>14. Disclaimers</p>
                <p>
                    To the fullest extent permitted by law:
                    <br />                    
                    <ul className={styles.list}>
                        <li>Our Services are provided on an “as is” and “as available” basis;</li>
                        <li>We make no warranties regarding uptime, accuracy, reliability, or fitness for a particular purpose;</li>
                        <li>We do not guarantee that bookings, services, or products will meet your expectations;</li> 
                        <li>We are not responsible for issues arising from third-party vendors, service providers, or users.</li>     
    
                    </ul>
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>15. Limitation of Liability</p>
                <p>
                    To the fullest extent permitted by law, An Eevent and its officers, directors, employees, and affiliates shall not be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption.
                    <br />                    
                    Our total liability for any claim related to the Services shall not exceed the amount you paid to us for the specific service giving rise to the claim, or the minimum amount permitted by law, whichever is less.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>16. Indemnification</p>
                <p>
                    You agree to indemnify, defend, and hold harmless An Eevent and its affiliates from any claims, losses, liabilities, damages, and expenses arising out of:
                    <br />                    
                    <ul className={styles.list}>
                        <li>Your use of the Services;</li>
                        <li>Your violation of these Terms;</li>
                        <li>Your interaction with vendors or other users;</li> 
                        <li>Your User Content or conduct.</li>     
                    </ul>
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>17. Indemnification</p>
                <p>
                    You agree to indemnify, defend, and hold harmless An Eevent and its affiliates from any claims, losses, liabilities, damages, and expenses arising out of:
                    <br />                    
                    <ul className={styles.list}>
                        <li>Your use of the Services;</li>
                        <li>Your violation of these Terms;</li>
                        <li>Your interaction with vendors or other users;</li> 
                        <li>Your User Content or conduct.</li>     
                    </ul>
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>18. Suspension and Termination</p>
                <p>
                    We may suspend or terminate your account or access to the Services at any time, with or without notice, if we believe you have violated these Terms or pose a risk to users or the platform.
                    <br />                    
                    Upon termination, your right to use the Services will immediately cease.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>19. Changes to the Terms</p>
                <p>
                    We may update these Terms from time to time. When we do, we will post the revised version with a new effective date. Continued use of the Services after changes become effective means you accept the revised Terms.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>20. Governing Law</p>
                <p>
                    These Terms shall be governed by and interpreted in accordance with the laws of Nigeria, without regard to conflict of law principles.
                </p>
                <br />
                <p style={{fontWeight: '700', textTransform:'uppercase', color:'#222222'}}>21. Contact Us</p>
                <p>
                    If you have questions or concerns about these Terms, please contact us at:
                    <br />                    
                    <ul className={styles.list}>
                        <li>Email: [Insert Email Address]  </li>
                        <li>Address: [Insert Business Address]  </li>
                        <li>Phone: [Insert Phone Number]</li>   
                    </ul>
                </p>
            </div>
        
        </div>
    );
}
 
export default TermsofUse;