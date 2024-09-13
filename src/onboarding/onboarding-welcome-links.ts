import { mdiAccountGroup, mdiFileDocument, mdiTabletCellphone } from "@mdi/js";
import {
  CSSResultGroup,
  LitElement,
  TemplateResult,
  css,
  html,
  nothing,
} from "lit";
import { customElement, property } from "lit/decorators";
import type { LocalizeFunc } from "../common/translations/localize";
import "../components/ha-card";
import type { HomeAssistant } from "../types";
import { showAppDialog } from "./dialogs/show-app-dialog";
import { showCommunityDialog } from "./dialogs/show-community-dialog";
import "./onboarding-welcome-link";

@customElement("onboarding-welcome-links")
class OnboardingWelcomeLinks extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ attribute: false }) public localize!: LocalizeFunc;

  @property({ type: Boolean }) public mobileApp = false;

  protected render(): TemplateResult {
    return html``;
  }

  private _openCommunity(): void {
    showCommunityDialog(this, { localize: this.localize });
  }

  private _openApp(): void {
    showAppDialog(this, { localize: this.localize });
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        margin-top: 16px;
        column-gap: 16px;
        row-gap: 16px;
      }
      @media (max-width: 550px) {
        :host {
          grid-template-columns: 1fr;
        }
      }
      .community {
        --welcome-link-color: #008142;
      }
      .app {
        --welcome-link-color: #6e41ab;
      }
      a {
        text-decoration: none;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "onboarding-welcome-links": OnboardingWelcomeLinks;
  }
}
