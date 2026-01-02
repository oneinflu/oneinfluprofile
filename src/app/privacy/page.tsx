import { BackgroundPattern } from "@/components/shared-assets/background-patterns";

export default function PrivacyPage() {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden  py-24">
           
            <div className="relative mx-auto w-full max-w-container px-4 md:px-4">
                <div className="rounded-2xl bg-primary/95 backdrop-blur px-2 py-20 shadow-xs ring-1 ring-secondary">
                    <div className="text-center">
                        <h1 className="text-display-md font-semibold text-primary md:text-display-lg">Privacy Notice</h1>
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
                            At INFLU MEDIA TECH, we are committed to protecting your privacy and being transparent about how we collect, use, store, and safeguard personal information. This Privacy Notice explains our data practices, the types of information we collect, how we use it, and the rights available to you under applicable laws.
                        </p>
                        <p className="mt-3 text-md text-tertiary md:text-lg leading-relaxed">
                            We encourage you to read this Privacy Notice carefully to understand how your information is handled.
                        </p>
                        <div className="mt-10 flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">What Does INFLU MEDIA TECH Do?</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU MEDIA TECH is a digital profile, portfolio, and discovery platform that allows individuals, creators, professionals, and businesses to:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Create a public or shareable profile</li>
                                    <li>Display links, services, portfolios, and social handles</li>
                                    <li>Showcase content and professional information</li>
                                    <li>Display their own payment identifiers (such as UPI IDs) to enable direct peer-to-peer payments outside the Platform</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">INFLU MEDIA TECH does not:</h2>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Process payments</li>
                                    <li>Store money</li>
                                    <li>Act as a wallet or escrow</li>
                                    <li>Facilitate refunds or chargebacks</li>
                                    <li>Collect transaction fees or commissions</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Our role is limited to providing infrastructure for discovery and presentation, operating as a neutral digital intermediary.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">How Does This Privacy Notice Apply to You?</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    This Privacy Notice applies to personal information we process as a data controller relating to:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Individuals who visit or use the INFLU MEDIA TECH Platform</li>
                                    <li>Individuals who create or manage profiles</li>
                                    <li>Individuals who view, follow, or interact with public profiles</li>
                                    <li>Individuals who contact us, submit forms, or provide feedback</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Collectively, we refer to these individuals as “Users.”</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Controller vs Intermediary Role</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU MEDIA TECH primarily acts as an intermediary under the Information Technology Act, 2000.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We do not control or participate in transactions conducted outside the Platform.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We do not act as a payment processor or financial service provider.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Third-Party Processing and Responsibilities</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU MEDIA TECH allows users to link or redirect to third-party platforms (such as social media sites, messaging apps, UPI applications, or external websites).
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Once you leave the INFLU Platform or interact with a third party:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Their privacy policies apply</li>
                                    <li>We do not control their data practices</li>
                                    <li>We are not responsible for how they process your data</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We strongly recommend reviewing third-party privacy policies before sharing personal information.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Information We Collect</h2>
                                <h3 className="text-md font-semibold text-primary">1. Information You Provide Voluntarily</h3>
                                <h4 className="text-md font-medium text-primary">Account &amp; Profile Information</h4>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Name or display name</li>
                                    <li>Email address</li>
                                    <li>Username</li>
                                    <li>Profile image</li>
                                    <li>Bio, portfolio content, links</li>
                                    <li>Social media handles</li>
                                </ul>
                                <h4 className="text-md font-medium text-primary">Communication Data</h4>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Messages sent to us (support, feedback, grievance)</li>
                                    <li>Information you provide when reporting violations or concerns</li>
                                </ul>
                                <h4 className="text-md font-medium text-primary">Payment Identifiers (Display Only)</h4>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>UPI ID or similar payment identifier provided by you</li>
                                    <li>These are displayed only and never processed or verified</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-md font-semibold text-primary">2. Information We Collect Automatically</h3>
                                <h4 className="text-md font-medium text-primary">Usage &amp; Technical Data</h4>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>IP address</li>
                                    <li>Browser type</li>
                                    <li>Device type</li>
                                    <li>Operating system</li>
                                    <li>Referring URLs</li>
                                    <li>Pages viewed and interactions</li>
                                </ul>
                                <h4 className="text-md font-medium text-primary">Analytics Data</h4>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Profile visits</li>
                                    <li>Link clicks</li>
                                    <li>Basic engagement metrics</li>
                                </ul>
                                <h4 className="text-md font-medium text-primary">Security &amp; Moderation Data</h4>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Logs to prevent abuse, fraud, or misuse</li>
                                    <li>Content review signals for policy compliance</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-md font-semibold text-primary">3. Information from Third Parties (Limited)</h3>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We may receive limited data from:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Login providers (e.g., Google, Apple – if enabled)</li>
                                    <li>Analytics or infrastructure service providers</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We do not ingest social media content, payment data, or transaction data.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">How We Use the Information We Collect</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We use personal information only for purposes necessary to operate the Platform, including:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Creating and maintaining user accounts</li>
                                    <li>Displaying profiles and portfolios</li>
                                    <li>Providing analytics and usage insights</li>
                                    <li>Responding to support or grievance requests</li>
                                    <li>Improving platform performance and security</li>
                                    <li>Enforcing our Terms and Community Guidelines</li>
                                    <li>Complying with legal obligations</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Legal Basis (Where Applicable)</h2>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Performance of a contract</li>
                                    <li>Legitimate interests (platform safety, improvement)</li>
                                    <li>Legal obligations</li>
                                    <li>User consent (where required)</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Children’s Data</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    INFLU MEDIA TECH is not intended for individuals under 18 years of age.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We do not knowingly collect personal information from children. If such data is identified, it will be deleted promptly.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">How and When We Share Information</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We do not sell personal data.</p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We may share information only:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>With service providers supporting hosting, analytics, or security</li>
                                    <li>When legally required (court orders, lawful government requests)</li>
                                    <li>To protect rights, safety, or prevent harm</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Public profiles are public by design. Any information you choose to display may be visible to others.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Payments &amp; UPI-Specific Privacy Clarification</h2>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>INFLU MEDIA TECH does not collect payment data</li>
                                    <li>UPI IDs are user-entered and user-controlled</li>
                                    <li>Payments occur outside the Platform</li>
                                    <li>INFLU MEDIA TECH does not access UPI apps or transaction details</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">All UPI activity is governed by:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>NPCI rules</li>
                                    <li>RBI guidelines</li>
                                    <li>The user’s chosen UPI application</li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Disclosure of Information to Other Countries</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Data may be processed or stored on cloud servers located in India or other jurisdictions where our infrastructure providers operate.
                                </p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We implement reasonable safeguards to ensure data protection in line with applicable laws.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Cookies and Tracking Technologies</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We use limited cookies for:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Session management</li>
                                    <li>Security</li>
                                    <li>Basic analytics</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">For more details, please refer to our Cookie Notice.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Data Retention</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We retain personal information only as long as:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Necessary to provide services</li>
                                    <li>Required by law</li>
                                    <li>Needed for security or dispute resolution</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Users may request deletion of their account and associated data.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Data Security</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We use:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Encryption</li>
                                    <li>Access controls</li>
                                    <li>Secure hosting</li>
                                    <li>Monitoring and logging</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    No system is 100% secure, but we take reasonable measures to protect your data.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Your Rights</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Depending on applicable law, you may have the right to:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Access your data</li>
                                    <li>Correct inaccuracies</li>
                                    <li>Request deletion</li>
                                    <li>Object to processing</li>
                                    <li>Withdraw consent (where applicable)</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">Requests can be made via our contact details below.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Indian IT Act &amp; Intermediary Compliance</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">INFLU MEDIA TECH complies with:</p>
                                <ul className="list-disc pl-5 space-y-2 text-md text-tertiary md:text-lg">
                                    <li>Information Technology Act, 2000</li>
                                    <li>IT (Intermediary Guidelines &amp; Digital Media Ethics Code) Rules, 2021</li>
                                </ul>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We act as a neutral intermediary and are not liable for user-generated content except as required by law.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Complaints &amp; Grievance Redressal</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">We take privacy complaints seriously.</p>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    Grievance Officer details will be published on the Platform as required under Indian law.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-semibold text-primary">Changes to This Privacy Notice</h2>
                                <p className="text-md text-tertiary md:text-lg leading-relaxed">
                                    We may update this Privacy Notice from time to time. Material changes will be communicated where required.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h2 className="text-lg font-semibold text-primary">Contact Us</h2>
                                <div className="flex items-center gap-3">
                                    <a href="mailto:privacy@oneinflu.com" className="text-md text-brand-secondary hover:text-brand-secondary_hover underline underline-offset-4">privacy@oneinflu.com</a>
                                    <a href="mailto:support@oneinflu.com" className="text-md text-brand-secondary hover:text-brand-secondary_hover underline underline-offset-4">support@oneinflu.com</a>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
