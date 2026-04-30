import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'public', 'images')

plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['Arial', 'Helvetica Neue', 'DejaVu Sans'],
})

GREEN  = '#15803D'   # deep emerald
BLUE   = '#1D4ED8'   # deep blue
RED    = '#B91C1C'   # deep red
NAVY   = '#0F172A'   # near-black for titles
DIM    = '#6B7280'   # muted gray for captions / tick labels
BG     = '#FFFFFF'
GRID   = '#F3F4F6'   # very subtle grid
RULE   = '#E5E7EB'   # light rule lines


def _style_ax(ax):
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.spines['bottom'].set_visible(True)
    ax.spines['bottom'].set_color(RULE)
    ax.spines['bottom'].set_linewidth(1)
    ax.yaxis.grid(True, color=GRID, linewidth=0.9, zorder=0)
    ax.set_axisbelow(True)
    ax.tick_params(length=0)


def save_completion():
    fig, ax = plt.subplots(figsize=(9, 6))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)

    tasks  = ['Trace a Square', 'Stamp 3 Shapes']
    values = [100, 100]
    colors = [GREEN, BLUE]

    bars = ax.bar(
        tasks, values, color=colors, width=0.38,
        edgecolor=BG, linewidth=1.5, zorder=2,
    )

    _style_ax(ax)

    # value labels inside bars in white
    for bar, val in zip(bars, values):
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            val - 6,
            f'{val}%',
            ha='center', va='top',
            fontsize=24, fontweight='bold', color='white',
        )

    ax.set_ylim(0, 115)
    ax.set_yticks([0, 25, 50, 75, 100])
    ax.set_yticklabels(['0%', '25%', '50%', '75%', '100%'], color=DIM, fontsize=11)
    ax.set_ylabel('Task completion rate (%)', color=DIM, fontsize=12, labelpad=10)
    ax.tick_params(axis='x', labelsize=13, labelcolor=NAVY)

    # left-aligned title + subtitle
    fig.text(0.10, 0.97, 'Task Completion Rate',
             fontsize=16, fontweight='bold', color=NAVY, va='top')
    fig.text(0.10, 0.91, 'n = 3 participants',
             fontsize=11, color=DIM, va='top')

    fig.text(0.5, 0.015,
             'All 3 participants finished both tasks unaided.',
             ha='center', fontsize=10, color=DIM, style='italic')

    plt.tight_layout(rect=[0, 0.05, 1, 0.88])
    out = os.path.join(OUTPUT_DIR, 'completion.png')
    plt.savefig(out, dpi=150, bbox_inches='tight', facecolor=BG)
    plt.close()
    print(f'Saved {out}')


def save_satisfaction():
    categories = ['Ease of use', 'Enjoyment', 'Would recommend']
    p1 = [5, 5, 4]
    p2 = [4, 5, 5]
    p3 = [5, 4, 4]
    means = [(p1[i] + p2[i] + p3[i]) / 3 for i in range(3)]

    fig, ax = plt.subplots(figsize=(11, 7))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)

    x     = np.arange(len(categories))
    width = 0.22

    ax.bar(x - width, p1, width, color=GREEN, label='P1',
           edgecolor=BG, linewidth=1.2, zorder=2)
    ax.bar(x,          p2, width, color=BLUE,  label='P2',
           edgecolor=BG, linewidth=1.2, zorder=2)
    ax.bar(x + width,  p3, width, color=RED,   label='P3',
           edgecolor=BG, linewidth=1.2, zorder=2)

    MEAN_CLR = '#4F46E5'   # indigo — distinct from all bar colors
    BADGE_Y  = 5.65        # above all bars

    half_span = width * 1.65
    for xi, mean in zip(x, means):
        # solid mean line at actual mean height
        ax.plot([xi - half_span, xi + half_span], [mean, mean],
                color=MEAN_CLR, linewidth=2.2, zorder=3, solid_capstyle='round')
        # thin dotted stem connecting line to badge
        ax.plot([xi, xi], [mean + 0.05, BADGE_Y - 0.18],
                color=MEAN_CLR, linewidth=0.9, linestyle=':', zorder=3, alpha=0.6)
        # floating badge above bars
        ax.text(xi, BADGE_Y,
                f'  mean = {mean:.1f}  ',
                ha='center', va='center',
                fontsize=10, fontweight='bold', color='white',
                bbox=dict(boxstyle='round,pad=0.35', facecolor=MEAN_CLR, edgecolor='none'),
                zorder=5)

    _style_ax(ax)

    ax.set_ylim(0, 6.3)
    ax.set_yticks([1, 2, 3, 4, 5])
    ax.set_yticklabels(['1', '2', '3', '4', '5'], color=DIM, fontsize=11)
    ax.set_ylabel('Rating (1–5 Likert)', color=DIM, fontsize=12, labelpad=10)
    ax.set_xticks(x)
    ax.set_xticklabels(categories, fontsize=13, color=NAVY)
    ax.tick_params(axis='x', labelcolor=NAVY)

    # left-aligned title + subtitle
    fig.text(0.08, 0.97, 'Post-Task Satisfaction Ratings',
             fontsize=16, fontweight='bold', color=NAVY, va='top')
    fig.text(0.08, 0.91, 'Overall mean = 4.5 / 5',
             fontsize=11, color=DIM, va='top')

    legend = ax.legend(
        fontsize=11, frameon=True, loc='upper right',
        fancybox=False, edgecolor=RULE, facecolor=BG,
        labelcolor=NAVY, borderpad=0.8,
    )

    fig.text(0.5, 0.015,
             'Each participant rated three dimensions on a 5-point Likert scale.',
             ha='center', fontsize=10, color=DIM, style='italic')

    plt.tight_layout(rect=[0, 0.05, 1, 0.88])
    out = os.path.join(OUTPUT_DIR, 'satisfaction.png')
    plt.savefig(out, dpi=150, bbox_inches='tight', facecolor=BG)
    plt.close()
    print(f'Saved {out}')


def save_timing():
    trace = [135, 152, 145]   # P1, P2, P3 — seconds per shape
    stamp = [62,  75,  79]

    task_avg_trace = sum(trace) / 3   # 144s = 2m 24s
    task_avg_stamp = sum(stamp) / 3   # 72s  = 1m 12s
    overall_mean   = (task_avg_trace + task_avg_stamp) / 2  # 108s = 1m 48s

    def fmt(s):
        s = round(s)
        return f'{s // 60}m {s % 60:02d}s'

    fig, ax = plt.subplots(figsize=(11, 7))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)

    x = np.arange(2)
    width = 0.22

    b1 = ax.bar(x - width, [trace[0], stamp[0]], width, color=GREEN, label='P1',
                edgecolor=BG, linewidth=1.2, zorder=2)
    b2 = ax.bar(x,          [trace[1], stamp[1]], width, color=BLUE,  label='P2',
                edgecolor=BG, linewidth=1.2, zorder=2)
    b3 = ax.bar(x + width,  [trace[2], stamp[2]], width, color=RED,   label='P3',
                edgecolor=BG, linewidth=1.2, zorder=2)

    # value labels inside bars
    for bars, vals in [(b1, [trace[0], stamp[0]]),
                       (b2, [trace[1], stamp[1]]),
                       (b3, [trace[2], stamp[2]])]:
        for bar, val in zip(bars, vals):
            ax.text(
                bar.get_x() + bar.get_width() / 2,
                val / 2,
                fmt(val),
                ha='center', va='center',
                fontsize=10, fontweight='bold', color='white', zorder=3,
            )

    # per-task mean badges (indigo) — badge floats just above each group's bars
    MEAN_CLR  = '#4F46E5'
    half_span = width * 1.65
    for xi, avg in zip(x, [task_avg_trace, task_avg_stamp]):
        badge_y = avg + 28
        ax.plot([xi - half_span, xi + half_span], [avg, avg],
                color=MEAN_CLR, linewidth=2.2, zorder=3, solid_capstyle='round')
        ax.plot([xi, xi], [avg + 3, badge_y - 6],
                color=MEAN_CLR, linewidth=0.9, linestyle=':', zorder=3, alpha=0.6)
        ax.text(xi, badge_y,
                f'  mean = {fmt(avg)}  ',
                ha='center', va='center',
                fontsize=10, fontweight='bold', color='white',
                bbox=dict(boxstyle='round,pad=0.35', facecolor=MEAN_CLR, edgecolor='none'),
                zorder=5)

    # overall mean — amber dashed rule + right-anchored badge
    AMB_CLR = '#D97706'
    ax.axhline(overall_mean, color=AMB_CLR, linewidth=1.5,
               linestyle='--', zorder=2, alpha=0.75)
    ax.annotate(
        f'  overall mean = {fmt(overall_mean)}  ',
        xy=(1.0, overall_mean),
        xycoords=('axes fraction', 'data'),
        ha='right', va='bottom',
        fontsize=10, fontweight='bold', color='white',
        annotation_clip=False,
        bbox=dict(boxstyle='round,pad=0.35', facecolor=AMB_CLR, edgecolor='none'),
        zorder=5,
    )

    _style_ax(ax)

    ax.set_ylim(0, 210)
    ax.set_yticks([0, 25, 50, 75, 100, 125, 150, 175])
    ax.set_yticklabels([str(v) for v in [0, 25, 50, 75, 100, 125, 150, 175]],
                       color=DIM, fontsize=11)
    ax.set_ylabel('Time per shape (seconds)', color=DIM, fontsize=12, labelpad=10)
    ax.set_xticks(x)
    ax.set_xticklabels(['Trace a Square\n(drawing task)', 'Stamp 3 Shapes\n(per shape)'],
                       fontsize=13, color=NAVY)
    ax.tick_params(axis='x', labelcolor=NAVY)

    legend = ax.legend(
        fontsize=11, frameon=True, loc='upper right',
        fancybox=False, edgecolor=RULE, facecolor=BG,
        labelcolor=NAVY, borderpad=0.8,
    )

    fig.text(0.08, 0.97, 'Time per Shape, by Participant and Task',
             fontsize=16, fontweight='bold', color=NAVY, va='top')
    fig.text(0.08, 0.91, 'n = 3 participants',
             fontsize=11, color=DIM, va='top')

    fig.text(0.5, 0.015,
             'Drawing took >2 min/shape; stamping ~1 min/shape. Grand mean across both tasks = 1m 48s.',
             ha='center', fontsize=10, color=DIM, style='italic')

    plt.tight_layout(rect=[0, 0.05, 1, 0.88])
    out = os.path.join(OUTPUT_DIR, 'timing.png')
    plt.savefig(out, dpi=150, bbox_inches='tight', facecolor=BG)
    plt.close()
    print(f'Saved {out}')


def save_storyboard():
    import textwrap
    from matplotlib.patches import FancyBboxPatch

    # ── Style constants ───────────────────────────────────────────
    INDIGO  = '#4F46E5'
    TASK_A  = '#15803D'
    TASK_B  = '#1D4ED8'
    BOX_ED  = '#D0D5E8'
    ARR_C   = '#94A3B8'

    CR       = 0.22    # circle radius
    PAD_V    = 0.18    # top/bottom padding inside box
    LINE_H   = 10.0 / 72 * 1.5   # ≈ 0.208 units per description line
    TITLE_GAP = 0.14   # gap between circle bottom and description top

    A_CX, B_CX = 3.2, 9.8
    BW  = 5.6    # task box width
    S1W = 8.0    # step-1 box width
    DW  = 55     # description wrap width for task boxes
    DW1 = 72     # description wrap width for step-1 box

    # Descriptions
    D = {
        'S1': 'Put on the Quest 3 and find a desk with paper, a pen, and a few stamps.',
        '2A': 'Select the Drawing option from the menu.',
        '2B': 'Select the Stamp option from the menu.',
        '3A': 'Reach out and pinch the pen.',
        '3B': 'Reach out and pinch the stamp.',
        '4A': 'Follow the guide line; system rewards on-path strokes with green ink. '
              'Check score and accuracy on screen.',
        '4B': 'Press a stamp onto the matching silhouette. '
              'Check score and accuracy on screen.',
    }

    def box_h(desc, dw):
        n = len(textwrap.wrap(desc, dw))
        return PAD_V + 2*CR + TITLE_GAP + n*LINE_H + PAD_V

    # Pre-compute heights so both columns stay aligned per row
    H_S1 = box_h(D['S1'], DW1)
    H_2  = max(box_h(D['2A'], DW), box_h(D['2B'], DW))
    H_3  = max(box_h(D['3A'], DW), box_h(D['3B'], DW))
    H_4  = max(box_h(D['4A'], DW), box_h(D['4B'], DW))

    # ── Vertical layout (top → bottom) ───────────────────────────
    # Pad values must match FancyBboxPatch pad so arrows hit visual edges
    P  = 0.06   # box pad
    PP = 0.05   # pill pad
    VG = 0.38   # desired visible arrow gap everywhere
    PILL_H   = 0.44
    STEP_GAP = VG + 2 * P   # computed gap so visual gap == VG

    CONTENT_TOP = 8.1
    S1_TOP  = CONTENT_TOP
    S1_BOT  = S1_TOP - H_S1
    BR_Y    = S1_BOT  - P  - VG          # VG below visual S1 bottom
    PIL_TOP = BR_Y    - PP - VG          # VG below branch (visual pill top)
    PIL_BOT = PIL_TOP - PILL_H
    S2_TOP  = PIL_BOT - PP - P  - VG    # VG below visual pill bottom
    S2_BOT  = S2_TOP  - H_2
    S3_TOP  = S2_BOT  - STEP_GAP
    S3_BOT  = S3_TOP  - H_3
    S4_TOP  = S3_BOT  - STEP_GAP
    S4_BOT  = S4_TOP  - H_4

    YLIM_TOP = 9.0
    YLIM_BOT = S4_BOT - 0.40

    fig, ax = plt.subplots(figsize=(13, YLIM_TOP - YLIM_BOT))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)
    ax.set_xlim(0, 13)
    ax.set_ylim(YLIM_BOT, YLIM_TOP)
    ax.axis('off')

    # ── Helpers ──────────────────────────────────────────────────
    def draw_box(cx, top, w, h, num, title, desc, nclr, dw):
        cy = top - h / 2
        # White card with subtle border
        ax.add_patch(FancyBboxPatch(
            (cx - w/2, cy - h/2), w, h,
            boxstyle='round,pad=0.06',
            fc='white', ec=BOX_ED, lw=1.2, zorder=2))
        # Colored left accent bar
        ax.plot([cx - w/2 + 0.055, cx - w/2 + 0.055],
                [cy - h/2 + 0.12,  cy + h/2 - 0.12],
                color=nclr, lw=5, solid_capstyle='round', zorder=3)
        # Step circle — kept away from the accent bar
        ccx = cx - w/2 + 0.42
        ccy = cy + h/2 - PAD_V - CR
        ax.add_patch(plt.Circle((ccx, ccy), CR, color=nclr, zorder=4))
        ax.text(ccx, ccy, str(num),
                ha='center', va='center',
                fontsize=10, fontweight='bold', color='white', zorder=5)
        # Title (right of circle)
        title_x = ccx + CR + 0.13
        ax.text(title_x, ccy, title,
                ha='left', va='center',
                fontsize=11, fontweight='bold', color=NAVY, zorder=4)
        # Description (below title row, aligned with title)
        desc_y = ccy - CR - TITLE_GAP
        ax.text(title_x, desc_y,
                '\n'.join(textwrap.wrap(desc, dw)),
                ha='left', va='top',
                fontsize=10, color=DIM, linespacing=1.55, zorder=4)

    def pill(cx, top, w, h, txt, clr):
        cy = top - h / 2
        ax.add_patch(FancyBboxPatch(
            (cx - w/2, cy - h/2), w, h,
            boxstyle='round,pad=0.05',
            fc=clr, ec='none', alpha=0.12, zorder=2))
        ax.text(cx, cy, txt, ha='center', va='center',
                fontsize=10.5, fontweight='bold', color=clr, zorder=3)

    def arr(x, y1, y2):
        ax.annotate('', xy=(x, y2), xytext=(x, y1),
                    arrowprops=dict(arrowstyle='->', color=ARR_C,
                                   lw=1.5, mutation_scale=14), zorder=3)

    def hln(x1, x2, y):
        ax.plot([x1, x2], [y, y], color=ARR_C, lw=1.5, zorder=3)

    # ── Title ────────────────────────────────────────────────────
    ax.text(6.5, YLIM_TOP - 0.40, 'Storyboard',
            ha='center', va='center',
            fontsize=16, fontweight='bold', color=NAVY)

    # ── Step 1 ───────────────────────────────────────────────────
    draw_box(6.5, S1_TOP, S1W, H_S1, 1,
             'Enter the VR room', D['S1'], INDIGO, DW1)

    # plain connector — starts at visual S1 bottom (computed - pad)
    ax.plot([6.5, 6.5], [S1_BOT - P, BR_Y], color=ARR_C, lw=1.5, zorder=3)
    hln(A_CX, B_CX, BR_Y)
    arr(A_CX, BR_Y, PIL_TOP + PP)
    arr(B_CX, BR_Y, PIL_TOP + PP)

    pill(A_CX, PIL_TOP, 4.8, PILL_H, 'Task A — Pen Drawing', TASK_A)
    pill(B_CX, PIL_TOP, 4.8, PILL_H, 'Task B — Stamping',    TASK_B)

    arr(A_CX, PIL_BOT - PP, S2_TOP + P)
    arr(B_CX, PIL_BOT - PP, S2_TOP + P)

    # ── Step 2 ───────────────────────────────────────────────────
    draw_box(A_CX, S2_TOP, BW, H_2, 2, 'Select Drawing', D['2A'], TASK_A, DW)
    draw_box(B_CX, S2_TOP, BW, H_2, 2, 'Select Stamp',   D['2B'], TASK_B, DW)

    arr(A_CX, S2_BOT - P, S3_TOP + P)
    arr(B_CX, S2_BOT - P, S3_TOP + P)

    # ── Step 3 ───────────────────────────────────────────────────
    draw_box(A_CX, S3_TOP, BW, H_3, 3, 'Take the Pen',   D['3A'], TASK_A, DW)
    draw_box(B_CX, S3_TOP, BW, H_3, 3, 'Take the Stamp', D['3B'], TASK_B, DW)

    arr(A_CX, S3_BOT - P, S4_TOP + P)
    arr(B_CX, S3_BOT - P, S4_TOP + P)

    # ── Step 4 ───────────────────────────────────────────────────
    draw_box(A_CX, S4_TOP, BW, H_4, 4, 'Draw the shape',   D['4A'], TASK_A, DW)
    draw_box(B_CX, S4_TOP, BW, H_4, 4, 'Stamp the target', D['4B'], TASK_B, DW)

    out = os.path.join(OUTPUT_DIR, 'storyboard.png')
    plt.savefig(out, dpi=150, bbox_inches='tight', facecolor=BG)
    plt.close()
    print(f'Saved {out}')


if __name__ == '__main__':
    save_completion()
    save_satisfaction()
    save_timing()
    save_storyboard()