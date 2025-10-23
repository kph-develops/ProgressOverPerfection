import SwiftUI

/// The main login screen shown after the welcome page.
struct LoginView: View {
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var selectedTab: AuthTab = .login

    var body: some View {
        ZStack {
            Color.parchmentBackground
                .ignoresSafeArea()

            ScrollView {
                VStack(spacing: 32) {
                    header
                    tabSelector
                    credentialCard
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 40)
                .frame(maxWidth: .infinity)
            }
        }
    }

    private var header: some View {
        VStack(spacing: 8) {
            Text("Welcome Back")
                .font(.system(size: 32, weight: .semibold, design: .serif))
                .foregroundColor(.primaryGreen)
                .multilineTextAlignment(.center)

            Text("Sign in to continue your journey")
                .font(.system(size: 16, weight: .medium))
                .foregroundColor(.mutedText)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
    }

    private var tabSelector: some View {
        GeometryReader { proxy in
            let tabWidth = proxy.size.width / CGFloat(AuthTab.allCases.count)

            ZStack(alignment: .leading) {
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(Color.white)
                    .shadow(color: Color.black.opacity(0.08), radius: 14, x: 0, y: 8)

                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(Color.selectionBackground)
                    .padding(6)
                    .frame(width: tabWidth - 12)
                    .offset(x: tabWidth * CGFloat(selectedTab.index))

                HStack(spacing: 0) {
                    ForEach(AuthTab.allCases) { tab in
                        Button {
                            withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
                                selectedTab = tab
                            }
                        } label: {
                            Text(tab.rawValue)
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundColor(tab == selectedTab ? .primaryGreen : .mutedText)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
        }
        .frame(height: 52)
    }

    private var credentialCard: some View {
        VStack(alignment: .leading, spacing: 24) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Login")
                    .font(.system(size: 22, weight: .semibold))
                    .foregroundColor(.primaryGreen)
                Text("Enter your credentials to access your account")
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(.mutedText)
            }

            VStack(alignment: .leading, spacing: 16) {
                InputField(title: "Username", placeholder: "Enter your username", text: $username)
                SecureInputField(title: "Password", placeholder: "Enter your password", text: $password)
            }

            Button(action: {}) {
                Text("Login")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
            }
            .buttonStyle(.plain)
            .background(Color.primaryGreen)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            .shadow(color: Color.primaryGreen.opacity(0.25), radius: 12, x: 0, y: 8)
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .fill(Color.white)
                .shadow(color: Color.black.opacity(0.05), radius: 24, x: 0, y: 16)
        )
    }
}

private enum AuthTab: String, CaseIterable, Identifiable {
    case login = "Login"
    case register = "Register"

    var id: String { rawValue }

    var index: Int {
        switch self {
        case .login: return 0
        case .register: return 1
        }
    }
}

private struct InputField: View {
    var title: String
    var placeholder: String
    @Binding var text: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 13, weight: .semibold))
                .foregroundColor(.mutedText)

            TextField(placeholder, text: $text)
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .background(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .strokeBorder(Color.fieldBorder, lineWidth: 1)
                        .background(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(Color.white)
                        )
                )
        }
    }
}

private struct SecureInputField: View {
    var title: String
    var placeholder: String
    @Binding var text: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 13, weight: .semibold))
                .foregroundColor(.mutedText)

            SecureField(placeholder, text: $text)
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .background(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .strokeBorder(Color.fieldBorder, lineWidth: 1)
                        .background(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(Color.white)
                        )
                )
        }
    }
}

private extension Color {
    static let primaryGreen = Color(red: 32 / 255, green: 77 / 255, blue: 64 / 255)
    static let parchmentBackground = Color(red: 249 / 255, green: 246 / 255, blue: 239 / 255)
    static let mutedText = Color(red: 105 / 255, green: 110 / 255, blue: 105 / 255)
    static let selectionBackground = Color(red: 232 / 255, green: 237 / 255, blue: 232 / 255)
    static let fieldBorder = Color(red: 218 / 255, green: 222 / 255, blue: 219 / 255)
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
