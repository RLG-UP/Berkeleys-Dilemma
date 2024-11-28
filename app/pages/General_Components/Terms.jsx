import React from 'react';

function Terms() {
    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-12 text-start">
                    <h4>Terms & Conditions</h4>
                    <p>
                        You agree to indemnify, defend, and hold harmless Berkeley's Dilemma, its
                        affiliates, and their respective officers, directors, employees, and agents
                        from and against any claims, liabilities, damages, losses, and expenses
                        arising from your use of the Site or violation of these Terms.
                    </p>
                    <p className="mt-5">
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <address>
                        Berkeley's Dilemma | <strong><i>221 B - Paradise City</i></strong> |{" "}
                        berkeleysdilemma@gmail.com | <strong><i>01800-4444-9999</i></strong>
                    </address>
                </div>
            </div>
        </section>
    );
}

export default Terms;
