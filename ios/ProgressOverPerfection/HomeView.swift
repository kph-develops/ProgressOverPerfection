import SwiftUI

struct HomeView: View {
    private let quote = "Your journey is unique. Honor your pace and trust the process."
    private let subtitle = "Welcome to your journey of growth and transformation"

    var body: some View {
        ZStack {
            LandingBackground()
                .ignoresSafeArea()

            VStack(spacing: 32) {
                ProgressLogo()

                VStack(spacing: 16) {
                    Text(quote)
                        .font(.system(.title, design: .serif))
                        .fontWeight(.semibold)
                        .foregroundStyle(.white)
                        .multilineTextAlignment(.center)
                        .minimumScaleFactor(0.8)
                        .padding(.horizontal)
                        .accessibilityHeading(.h1)

                    Text(subtitle)
                        .font(.system(.callout, design: .default))
                        .fontWeight(.medium)
                        .foregroundStyle(.white.opacity(0.85))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                .padding(.horizontal)

                Button(action: {}) {
                    Text("Enter Dashboard")
                        .font(.system(.headline, design: .default))
                        .fontWeight(.semibold)
                        .padding(.horizontal, 36)
                        .padding(.vertical, 16)
                        .frame(minWidth: 0)
                }
                .buttonStyle(PrimaryFilledButtonStyle())
                .accessibilityLabel("Enter dashboard")
            }
            .padding(.horizontal, 24)
        }
    }
}

private struct ProgressLogo: View {
    private let gradient = LinearGradient(
        gradient: Gradient(colors: [
            Color(hex: 0x0F3F35),
            Color(hex: 0x1E5C49),
            Color(hex: 0x396F54),
            Color(hex: 0xD8B86A)
        ]),
        startPoint: .top,
        endPoint: .bottom
    )

    var body: some View {
        VStack(spacing: 18) {
            ZStack {
                ButterflyWing(topSection: true)
                    .fill(gradient)
                    .frame(width: 148, height: 110)
                    .scaleEffect(x: -1, y: 1)

                ButterflyWing(topSection: true)
                    .fill(gradient)
                    .frame(width: 148, height: 110)

                ButterflyWing(topSection: false)
                    .fill(gradient)
                    .frame(width: 138, height: 110)
                    .offset(y: 44)
                    .scaleEffect(x: -1, y: 1)

                ButterflyWing(topSection: false)
                    .fill(gradient)
                    .frame(width: 138, height: 110)
                    .offset(y: 44)

                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .fill(LinearGradient(colors: [Color(hex: 0x264D3C), Color(hex: 0xDAB96B)], startPoint: .top, endPoint: .bottom))
                    .frame(width: 24, height: 60)
                    .offset(y: 12)

                Circle()
                    .fill(LinearGradient(colors: [Color(hex: 0x244C3B), Color(hex: 0xE3C176)], startPoint: .top, endPoint: .bottom))
                    .frame(width: 22, height: 22)
                    .offset(y: -18)

                ZStack {
                    SmallButterfly()
                        .frame(width: 38, height: 28)
                        .offset(x: 46, y: -52)

                    SmallButterfly()
                        .frame(width: 28, height: 20)
                        .offset(x: 68, y: -88)

                    SmallButterfly()
                        .frame(width: 20, height: 15)
                        .offset(x: 86, y: -112)
                }
            }
            .shadow(color: .black.opacity(0.35), radius: 12, x: 0, y: 10)

            VStack(spacing: 8) {
                GradientText("PROGRESS", font: .system(size: 28, weight: .medium, design: .serif))

                GradientText("OVER PERFECTION", font: .system(size: 16, weight: .medium, design: .serif))
                    .kerning(4)
            }
        }
        .padding(.bottom, 24)
    }
}

private struct ButterflyWing: Shape {
    var topSection: Bool

    func path(in rect: CGRect) -> Path {
        var path = Path()
        let width = rect.width
        let height = rect.height

        if topSection {
            path.move(to: CGPoint(x: width * 0.08, y: height * 0.55))
            path.addCurve(
                to: CGPoint(x: width * 0.95, y: height * 0.18),
                control1: CGPoint(x: width * 0.35, y: height * -0.05),
                control2: CGPoint(x: width * 0.85, y: height * 0.05)
            )
            path.addCurve(
                to: CGPoint(x: width * 0.18, y: height * 0.0),
                control1: CGPoint(x: width * 0.72, y: height * 0.36),
                control2: CGPoint(x: width * 0.42, y: height * 0.02)
            )
            path.addCurve(
                to: CGPoint(x: width * 0.08, y: height * 0.55),
                control1: CGPoint(x: width * 0.04, y: height * 0.25),
                control2: CGPoint(x: width * 0.02, y: height * 0.4)
            )
        } else {
            path.move(to: CGPoint(x: width * 0.12, y: height * 0.0))
            path.addCurve(
                to: CGPoint(x: width * 0.9, y: height * 0.58),
                control1: CGPoint(x: width * 0.45, y: height * 0.05),
                control2: CGPoint(x: width * 0.85, y: height * 0.25)
            )
            path.addCurve(
                to: CGPoint(x: width * 0.18, y: height * 1.02),
                control1: CGPoint(x: width * 0.86, y: height * 0.95),
                control2: CGPoint(x: width * 0.45, y: height * 1.08)
            )
            path.addCurve(
                to: CGPoint(x: width * 0.12, y: height * 0.0),
                control1: CGPoint(x: width * -0.02, y: height * 0.68),
                control2: CGPoint(x: width * 0.01, y: height * 0.25)
            )
        }

        path.closeSubpath()
        return path
    }
}

private struct SmallButterfly: View {
    var body: some View {
        GeometryReader { proxy in
            let size = proxy.size
            let gradient = LinearGradient(colors: [Color(hex: 0xF5C16C), Color(hex: 0xF9DBA1)], startPoint: .bottomLeading, endPoint: .topTrailing)

            ZStack {
                ButterflyWing(topSection: true)
                    .fill(gradient)
                    .scaleEffect(x: -1, y: 1)
                ButterflyWing(topSection: true)
                    .fill(gradient)
                ButterflyWing(topSection: false)
                    .fill(gradient)
                    .scaleEffect(x: -1, y: 1)
                    .scaleEffect(0.72)
                    .offset(y: size.height * 0.18)
                ButterflyWing(topSection: false)
                    .fill(gradient)
                    .scaleEffect(0.72)
                    .offset(y: size.height * 0.18)
            }
        }
    }
}

private struct GradientText: View {
    var content: String
    var font: Font

    init(_ content: String, font: Font) {
        self.content = content
        self.font = font
    }

    var body: some View {
        Text(content)
            .font(font)
            .textCase(.uppercase)
            .multilineTextAlignment(.center)
            .foregroundColor(.clear)
            .overlay(
                LinearGradient(colors: [Color(hex: 0x0D4336), Color(hex: 0x4A7A60), Color(hex: 0xEAC27C)], startPoint: .leading, endPoint: .trailing)
            )
            .mask(Text(content)
                .font(font)
                .textCase(.uppercase)
                .multilineTextAlignment(.center))
    }
}

private struct LandingBackground: View {
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                LinearGradient(
                    colors: [Color(hex: 0x0B3D2E), Color(hex: 0x356E3F)],
                    startPoint: .top,
                    endPoint: .bottom
                )
                .opacity(0.9)

                Image("LandingBackground")
                    .resizable()
                    .scaledToFill()
                    .frame(width: geometry.size.width, height: geometry.size.height)
                    .clipped()
                    .overlay(Color.black.opacity(0.35))
            }
            .frame(width: geometry.size.width, height: geometry.size.height)
        }
    }
}

private struct PrimaryFilledButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .foregroundStyle(Color(hex: 0x243219))
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(Color(hex: 0xF5C16C))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .stroke(Color.white.opacity(configuration.isPressed ? 0.9 : 0.6), lineWidth: 1)
            )
            .shadow(color: Color.black.opacity(configuration.isPressed ? 0.1 : 0.25), radius: configuration.isPressed ? 2 : 6, x: 0, y: configuration.isPressed ? 1 : 4)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(.easeOut(duration: 0.2), value: configuration.isPressed)
            .padding(.horizontal, 24)
    }
}

private extension Color {
    init(hex: UInt32, alpha: Double = 1) {
        let red = Double((hex & 0xFF0000) >> 16) / 255
        let green = Double((hex & 0x00FF00) >> 8) / 255
        let blue = Double(hex & 0x0000FF) / 255
        self.init(.sRGB, red: red, green: green, blue: blue, opacity: alpha)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
            .previewLayout(.sizeThatFits)
            .previewDisplayName("Landing")
            .padding()
    }
}
