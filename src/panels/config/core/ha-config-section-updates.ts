import { RequestSelectedDetail } from "@material/mwc-list/mwc-list-item";
import { mdiDotsVertical, mdiRefresh } from "@mdi/js";
import { HassEntities } from "home-assistant-js-websocket";
import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property, state } from "lit/decorators";
import memoizeOne from "memoize-one";
import { isComponentLoaded } from "../../../common/config/is_component_loaded";
import { shouldHandleRequestSelectedEvent } from "../../../common/mwc/handle-request-selected-event";
import "../../../components/ha-alert";
import "../../../components/ha-bar";
import "../../../components/ha-button-menu";
import "../../../components/ha-card";
import "../../../components/ha-check-list-item";
import "../../../components/ha-metric";
import { extractApiErrorMessage } from "../../../data/hassio/common";
import {
  HassioSupervisorInfo,
  SupervisorOptions,
  fetchHassioSupervisorInfo,
  reloadSupervisor,
  setSupervisorOption,
} from "../../../data/hassio/supervisor";
import {
  checkForEntityUpdates,
  filterUpdateEntitiesWithInstall,
} from "../../../data/update";
import { showAlertDialog } from "../../../dialogs/generic/show-dialog-box";
import "../../../layouts/hass-subpage";
import type { HomeAssistant } from "../../../types";
import "../dashboard/ha-config-updates";
import { showJoinBetaDialog } from "./updates/show-dialog-join-beta";

@customElement("ha-config-section-updates")
class HaConfigSectionUpdates extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @state() private _showSkipped = false;

  @state() private _supervisorInfo?: HassioSupervisorInfo;

  protected firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    if (isComponentLoaded(this.hass, "hassio")) {
      this._refreshSupervisorInfo();
    }
  }

  protected render(): TemplateResult {
    let canInstallUpdates = this._filterUpdateEntitiesWithInstall(
      this.hass.states,
      this._showSkipped
    );

    if (window.location.href.endsWith("/core")) {
      this.hass.callService("homeassistant", "update_entity", {
        entity_id: ["nrjhub.core", "nrjhub.frontend"],
      });
      window.location.href = window.location.href.replace("/core", "");
    }

    return html`
      <hass-subpage
        back-path="/config/system"
        .hass=${this.hass}
        .narrow=${this.narrow}
        .header=${this.hass.localize("ui.panel.config.updates.caption")}
      >
        <div slot="toolbar-icon">
          <ha-button-menu multi>
            <ha-icon-button
              slot="trigger"
              .label=${this.hass.localize("ui.common.menu")}
              .path=${mdiDotsVertical}
            ></ha-icon-button>
            <ha-check-list-item
              left
              @request-selected=${this._toggleSkipped}
              .selected=${this._showSkipped}
            >
              ${this.hass.localize("ui.panel.config.updates.show_skipped")}
            </ha-check-list-item>
            ${this._supervisorInfo
              ? html`
                  <li divider role="separator"></li>
                  <mwc-list-item
                    @request-selected=${this._toggleBeta}
                    .disabled=${this._supervisorInfo.channel === "dev"}
                  >
                    ${this._supervisorInfo.channel === "stable"
                      ? this.hass.localize("ui.panel.config.updates.join_beta")
                      : this.hass.localize(
                          "ui.panel.config.updates.leave_beta"
                        )}
                  </mwc-list-item>
                `
              : ""}
          </ha-button-menu>
        </div>
        <div class="content">
            <ha-card outlined class="core-updates">
              <div class="card-content">
                  <div class="no-updates">
                      NRJHub Core and/or Frontend can be updated.
                      <br>
                      <button id="update-core" class="mdc-button">
                        Install updates
                      </button>
                      <style>
                        .mdc-button:not(:disabled) {
                          color: #6200ee;

                          color: var(--mdc-theme-primary, #6200ee);

                          padding: 0px;
                        }
                        .mdc-button {
                          flex: auto;

                          overflow: hidden;

                          cursor: pointer;

                        }
                        .mdc-button {
                          height: 36px;

                          border-radius: 4px;

                          border-radius: var(--mdc-shape-small, 4px);

                        }
                        .mdc-button {
                          position: relative;

                          display: inline-flex;

                          align-items: center;

                          justify-content: center;

                          box-sizing: border-box;

                          min-width: 64px;

                          border: none;

                          outline: none;

                          line-height: inherit;

                          user-select: none;

                          -webkit-appearance: none;

                          overflow: visible;

                          vertical-align: middle;

                          background: transparent;

                        }
                        .mdc-button {
                          -moz-osx-font-smoothing: grayscale;

                          -webkit-font-smoothing: antialiased;

                          font-family: Roboto, sans-serif;

                          font-family: var(--mdc-typography-button-font-family,var(--mdc-typography-font-family, Roboto, sans-serif) );

                          font-size: 0.875rem;

                          font-size: var(--mdc-typography-button-font-size, 0.875rem);

                          line-height: 2.25rem;

                          line-height: var(--mdc-typography-button-line-height, 2.25rem);

                          font-weight: 500;

                          font-weight: var(--mdc-typography-button-font-weight, 500);

                          letter-spacing: 0.0892857143em;

                          letter-spacing: var(--mdc-typography-button-letter-spacing, 0.0892857143em);

                          text-decoration: none;

                          text-decoration: var(--mdc-typography-button-text-decoration, none);

                          text-transform: uppercase;

                          text-transform: var(--mdc-typography-button-text-transform, uppercase);

                        }
                      </style>
                  </div>
              </div>
            </ha-card>
          <ha-card outlined>
            <div class="card-content">
              ${canInstallUpdates.length
                ? html`
                    <ha-config-updates
                      .hass=${this.hass}
                      .narrow=${this.narrow}
                      .updateEntities=${canInstallUpdates}
                      showAll
                    ></ha-config-updates>
                  `
                : html`
                    <div class="no-updates">
                      ${this.hass.localize(
                        "ui.panel.config.updates.no_updates"
                      )}
                    </div>
                  `}
            </div>
          </ha-card>
        </div>
      </hass-subpage>
    `;
  }

  private async _refreshSupervisorInfo() {
    this._supervisorInfo = await fetchHassioSupervisorInfo(this.hass);
  }

  private _toggleSkipped(ev: CustomEvent<RequestSelectedDetail>): void {
    if (ev.detail.source !== "property") {
      return;
    }

    this._showSkipped = !this._showSkipped;
  }

  private async _toggleBeta(
    ev: CustomEvent<RequestSelectedDetail>
  ): Promise<void> {
    if (!shouldHandleRequestSelectedEvent(ev)) {
      return;
    }

    if (this._supervisorInfo!.channel === "stable") {
      showJoinBetaDialog(this, {
        join: async () => this._setChannel("beta"),
      });
    } else {
      this._setChannel("stable");
    }
  }

  private async _setChannel(
    channel: SupervisorOptions["channel"]
  ): Promise<void> {
    try {
      await setSupervisorOption(this.hass, {
        channel,
      });
      await reloadSupervisor(this.hass);
      await this._refreshSupervisorInfo();
    } catch (err: any) {
      showAlertDialog(this, {
        text: extractApiErrorMessage(err),
      });
    }
  }

  private async _checkUpdates(): Promise<void> {
    checkForEntityUpdates(this, this.hass);
  }

  private _filterUpdateEntitiesWithInstall = memoizeOne(
    (entities: HassEntities, showSkipped: boolean) =>
      filterUpdateEntitiesWithInstall(entities, showSkipped)
  );

  static styles = css`
    .content {
      padding: 28px 20px 0;
      max-width: 1040px;
      margin: 0 auto;
    }
    ha-card {
      max-width: 600px;
      margin: 0 auto;
      height: 100%;
      justify-content: space-between;
      flex-direction: column;
      display: flex;
      margin-bottom: max(24px, env(safe-area-inset-bottom));
    }

    .card-content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 0;
    }

    .no-updates {
      padding: 16px;
    }
    li[divider] {
      border-bottom-color: var(--divider-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-section-updates": HaConfigSectionUpdates;
  }
}
