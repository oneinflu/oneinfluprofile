import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

export default function TermsPage() {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden  py-24">
           
            <div className="relative mx-auto w-full max-w-container px-4 md:px-4">
                <div className="rounded-2xl bg-primary/95 backdrop-blur px-2 py-20 shadow-xs ring-1 ring-secondary">
                    <div className="text-center">
                        <h1 className="text-display-md font-semibold text-primary md:text-display-lg">Terms and Conditions</h1>
                    </div>
                    <div className="mx-auto mt-6 w-full max-w-3xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <p className="text-xs text-secondary">Effective Date</p>
                                <p className="text-sm text-primary">15 December 2025</p>
                            </div>
                            <div>
                                <p className="text-xs text-secondary">Last Updated</p>
                                <p className="text-sm text-primary">15 December 2025</p>
                            </div>
                        </div>
                        <p className="mt-5 text-md text-tertiary md:text-lg leading-relaxed">
                            INFLU MEDIA TECH is a digital profile, portfolio, discovery, and audience interaction platform that enables individuals, creators, professionals, and businesses to showcase links, services, content, and payment identifiers in one place. Our goal is to provide a neutral, simple, and secure platform while remaining compliant with applicable Indian laws.
                        </p>
                        <div className="mt-10 flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <h2 className="text-lg font-semibold text-primary">1. Welcome to INFLU MEDIA TECH</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    These Terms &amp; Conditions (“Terms”) govern your access to and use of the INFLU MEDIA TECH platform, including:
                                </p>
                                <div className="flex items-center">
                                    <a
                                        href="https://oneinflu.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-md text-brand-secondary hover:text-brand-secondary_hover underline underline-offset-4"
                                    >
                                        https://oneinflu.com
                                    </a>
                                </div>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Any subdomains, mobile applications, dashboards, APIs, and related services</li>
                                    <li>Collectively referred to as the “Platform”</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    When we say “INFLU,” “INFLU MEDIA TECH,” “we,” “us,” or “our,” we refer to INFLU MEDIA TECH Private Limited, an Indian company incorporated under the Companies Act, 2013.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    By accessing or using the Platform, you agree to these Terms and all linked policies. If you do not agree, you must not use the Platform.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">2. Changes to These Terms</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We may update these Terms to reflect:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Legal or regulatory changes</li>
                                    <li>Platform updates or feature changes</li>
                                    <li>Risk, security, or compliance needs</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Updated Terms will be published on the Platform. Continued use after changes take effect constitutes acceptance. If changes materially
                                    affect your rights, we will provide reasonable prior notice where feasible.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">3. Your Account</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">To create an account:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>You must be 18 years or older</li>
                                    <li>You must provide accurate and lawful information</li>
                                    <li>You must be legally capable of entering into a binding agreement</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">You are responsible for:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Maintaining account security</li>
                                    <li>All activity conducted through your account</li>
                                    <li>Ensuring lawful use of the Platform</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">You must not:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Impersonate others</li>
                                    <li>Use bots or automated scripts</li>
                                    <li>Transfer or sell accounts</li>
                                    <li>Use the Platform for unlawful purposes</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    If you use INFLU on behalf of another person or entity, you confirm that you are authorized to do so.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">4. Username Policy</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Usernames must:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Not infringe trademarks, copyrights, or personality rights</li>
                                    <li>Not be misleading, offensive, or deceptive</li>
                                    <li>Not be registered for resale (“username squatting”)</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Inactive usernames (no login, updates, or traffic for 6 months) may be reclaimed without notice.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">5. Platform Access, Pricing &amp; Storage</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">INFLU MEDIA TECH currently operates as a FREE platform.</p>
                                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    <li className="rounded-lg bg-primary px-3 py-2 text-center ring-1 ring-secondary text-sm text-primary">No subscription fees</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-center ring-1 ring-secondary text-sm text-primary">No premium plans</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-center ring-1 ring-secondary text-sm text-primary">No commissions</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-center ring-1 ring-secondary text-sm text-primary">No transaction fees</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Each user is provided with:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Profile creation and management</li>
                                    <li>Link and service listing</li>
                                    <li>Up to 15GB of portfolio/content storage</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We reserve the right to introduce paid features in the future with prior notice and updated Terms.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">6. Your Content</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    “Content” includes text, images, videos, links, services, portfolio files, payment identifiers (including UPI IDs), and any material you upload or display.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">You represent and warrant that:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>You own or have rights to your content</li>
                                    <li>Your content is lawful and non-deceptive</li>
                                    <li>Your content does not violate third-party rights</li>
                                    <li>Your content complies with Indian laws and regulations</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We do not pre-screen content but may remove or restrict access where required by law or policy.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">7. License to Use Content</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    By uploading content, you grant INFLU MEDIA TECH a non-exclusive, royalty-free, worldwide license to host, display, and distribute such content solely for operating and promoting the Platform.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">You retain full ownership of your content.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">8. Payments, UPI Intent &amp; Financial Disclaimer</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU MEDIA TECH allows users to display their own UPI IDs or payment identifiers to enable direct peer-to-peer payments.
                                </p>
                                <p className="text-md font-medium text-primary">Important Legal Position</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                                    <li className="rounded-lg bg-primary px-3 py-2 text-left ring-1 ring-secondary text-sm text-primary">Does NOT process payments</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-left ring-1 ring-secondary text-sm text-primary">Does NOT collect or route money</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-left ring-1 ring-secondary text-sm text-primary">Does NOT act as aggregator/intermediary/wallet/escrow</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-left ring-1 ring-secondary text-sm text-primary">Does NOT charge fees/commissions</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-left ring-1 ring-secondary text-sm text-primary">Does NOT hold user funds</li>
                                    <li className="rounded-lg bg-primary px-3 py-2 text-left ring-1 ring-secondary text-sm text-primary">Does NOT facilitate refunds or chargebacks</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">All payments:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Occur outside the Platform</li>
                                    <li>Are executed directly via UPI apps governed by NPCI &amp; RBI</li>
                                    <li>Are solely between the payer and the recipient</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Users are fully responsible for:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Providing their own correct UPI ID</li>
                                    <li>Compliance with RBI, NPCI, GST, Income Tax, and consumer laws</li>
                                    <li>Handling disputes, refunds, fraud, or failed transactions</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU MEDIA TECH bears no financial or legal liability for any payment-related matter.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">9. RBI &amp; NPCI Compliance Clarification</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">INFLU MEDIA TECH is not a regulated payment entity under:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>RBI Act, 1934</li>
                                    <li>Payment and Settlement Systems Act, 2007</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">UPI transactions displayed on profiles are governed exclusively by:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>NPCI rules</li>
                                    <li>RBI guidelines</li>
                                    <li>The user’s UPI app provider</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU does not require RBI authorization as it does not participate in payment processing.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">10. Intermediary Status (IT Act, 2000)</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU MEDIA TECH acts as an “Intermediary” under Section 2(1)(w) of the Information Technology Act, 2000.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    In accordance with Section 79 and the IT (Intermediary Guidelines &amp; Digital Media Ethics Code) Rules, 2021:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>We do not initiate transmissions</li>
                                    <li>We do not select recipients</li>
                                    <li>We do not modify user content</li>
                                    <li>We act as a neutral platform</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Users are solely responsible for content they publish.</p>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">11. Content Takedown &amp; Grievance Redressal</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We may remove content if:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Required by law or court order</li>
                                    <li>It violates these Terms</li>
                                    <li>It threatens platform safety</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Grievance Officer (India)</p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Details will be published on the Platform as required under Rule 3(2) of the Intermediary Rules.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">12. Suspension or Termination</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We may suspend or terminate accounts for:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Legal violations</li>
                                    <li>Repeated abuse</li>
                                    <li>Security risks</li>
                                    <li>Court or government orders</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Inactive free accounts may be removed after extended inactivity.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">13. Intellectual Property</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">All Platform IP (excluding user content) belongs to INFLU MEDIA TECH.</p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">You may not copy, reverse engineer, or misuse Platform assets.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">14. Privacy &amp; Data</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Our Privacy Policy, Cookie Policy, and Data Processing Addendum govern data handling.</p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Platform analytics belong to INFLU MEDIA TECH. No payment data is collected or stored.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">15. Liability Limitation</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">To the maximum extent permitted by law:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>INFLU MEDIA TECH is not liable for indirect or consequential damages</li>
                                    <li>Liability is limited to INR ₹1,000 or fees paid (if any), whichever is lower</li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">16. Disclaimers</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">The Platform is provided “AS IS” and “AS AVAILABLE.”</p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We do not guarantee availability, accuracy, or suitability for any purpose.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">17. Third-Party Services</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Links or integrations with third-party platforms are governed by their own terms.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">INFLU is not responsible for third-party services.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">18. Governing Law &amp; Jurisdiction</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">These Terms are governed by the laws of India.</p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Courts of Hyderabad, Telangana, India shall have exclusive jurisdiction.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">19. Contact &amp; Support</h2>
                                <div className="flex items-center">
                                    <a
                                        href="mailto:support@oneinflu.com"
                                        className="text-md text-brand-secondary hover:text-brand-secondary_hover underline underline-offset-4"
                                    >
                                        support@oneinflu.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
